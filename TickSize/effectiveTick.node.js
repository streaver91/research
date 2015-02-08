var fs = require('fs');

var TREAT_START = new Date('04/01/2014');
var TREAT_CUTOFF = 50;
var TAQ_FILE = 'taq.txt';
var OUTPUT_FILE = 'effectiveTick.txt';
var COL_ISIN = 0;
var COL_DATE = 2;
var COL_OPEN = 3;
var COL_CLOSE = 6;
var COL_SHARES = 7;
var COL_VOL = 9;
var DAYCOUNT_THRESHOLD = 1;

var output = [];
var spreads = [1.0, 0.5, 0.1, 0.05, 0.01, 0.005, 0.001];
var N = [];
var F = [];
var U = [];
var gamma = [];

fs.readFile(TAQ_FILE, 'utf-8', function(err, res) {
  var curIsin = '';
  var curYear = 0;
  var curMon = 0;
  var curVolSum = 0;
  var curSharesSum = 0;
  var curDayCount = 0;
  var curDate;
  
  var reset = function() {
    for(var i = 0; i < spreads.length; i++) {
      N[i] = 0;
      F[i] = 0;
      U[i] = 0;
      gamma[i] = 0;
    }
    curVolSum = 0;
    curSharesSum = 0;
    curDayCount = 0;
  };
  
  var outputCurFirmMonth = function() {
    if(curVolSum == 0) return;
    if(curSharesSum == 0) return;
    if(curDayCount < DAYCOUNT_THRESHOLD) return;
    if(curVolSum / curSharesSum > 100) return;
    var len = spreads.length;
    var sumN = 0;
    // Calc F[]
    for(var i = 0; i < len; i++) {
      sumN += N[i];
    }
    for(var i = 0; i < len; i++) {
      F[i] = N[i] / sumN;
    }
    // Calc U[]
    U[0] = 2 * F[0];
    for(var i = 1; i < len - 1; i++) {
      U[i] = 2 * F[i] - F[i-1];
    }
    U[len-1] = F[len-1] - F[len-2];
    // Calc gamma[]
    var sumGamma = 0.0;
    gamma[0] = Math.min(Math.max(U[0], 0), 1);
    sumGamma += gamma[0];
    for(var i = 1; i < spreads.length; i++) {
      gamma[i] = Math.min(Math.max(U[i], 0), 1 - sumGamma);
      sumGamma += gamma[i];
    }
    // Calc effectiveTick
    var effectiveTick = 0.0;
    for(var i = 0; i < len; i++) {
      effectiveTick += gamma[i] * spreads[i];
    }
    effectiveTick = effectiveTick / (curVolSum / curSharesSum);
    var treat = (curSharesSum * TREAT_CUTOFF > curVolSum && curDate > TREAT_START) ? 1 : 0;
    // if(isNaN(treat) || isNaN, curVolSum / curSharesSum) continue;
    output.push([curIsin, curMon + curYear * 12, effectiveTick, treat, curVolSum / curSharesSum].join('\t'));
  };
  
  res = res.split(/[\r]?\n/);
  console.log(res.length);

  reset();
  
  for(var i = 0; i < res.length; i++) {
    // Wrong data
    if(res[i] == 'BE0003880979	Euronext Brussels	04/02/2014	1.50	1.50	1.41	1.42	165597	79	240341.59	EUR') continue;
    var resI = res[i].split(/\t/g);
    var dateI = new Date(resI[COL_DATE]);
    var monI = dateI.getMonth() + 1;
    var yearI = dateI.getFullYear();
    var isinI = resI[COL_ISIN];
    if(isinI != curIsin || monI != curMon || yearI != curYear) {
      // New record
      if(curIsin != '') {
        outputCurFirmMonth();
      }
      curIsin = isinI;
      curMon = monI;
      curYear = yearI;
      curDate = dateI;
      reset();
    }
    var closePrice = parseFloat(resI[COL_CLOSE]);
    var volume = parseFloat(resI[COL_VOL]);
    var shares = parseInt(resI[COL_SHARES]);
    
    for(var j = 0; j < spreads.length; j++) {
      var ratio = closePrice / spreads[j];
      if(Math.round(closePrice * 1000) % Math.round(spreads[j] * 1000) == 0) {
        N[j] += 1;
        break;
      }
    }
    curVolSum += volume;
    curSharesSum += shares;
    curDayCount += 1;
  }
  outputCurFirmMonth();
  
  fs.writeFile(OUTPUT_FILE, output.join('\r\n'), function(err) {
    console.log('Data saved to ' + OUTPUT_FILE);
  });
});