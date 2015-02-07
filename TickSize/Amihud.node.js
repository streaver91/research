var fs = require('fs');

var TREAT_START = new Date('03/31/2014');
var TREAT_CUTOFF = 50;
var TAQ_FILE = 'taq.txt';
var OUTPUT_FILE = 'Amihud.txt';
var COL_ISIN = 0;
var COL_DATE = 2;
var COL_OPEN = 3;
var COL_CLOSE = 6;
var COL_SHARES = 7;
var COL_VOL = 9;
var DAYCOUNT_THRESHOLD = 0;

var output = [];

fs.readFile(TAQ_FILE, 'utf-8', function(err, res) {
  res = res.split(/[\r]?\n/);
  console.log(res.length);
  var curIsin = '';
  var curYear = 0;
  var curMon = 0;
  var curVolSum = 0.0;
  var curAbsDailyReturnSum = 0.0;
  var curSharesSum = 0;
  var curAmihud = 0;
  var curDayCount = 0;
  var curStartDate;
  
  var outputCurFirmMonth = function() {
    if(curVolSum == 0) return;
    if(curDayCount < DAYCOUNT_THRESHOLD) return;
    if(curVolSum / curSharesSum > 100) return;
    var treat = (curSharesSum * TREAT_CUTOFF > curVolSum && curStartDate > TREAT_START) ? 1 : 0;
    output.push([curIsin, curMon + curYear * 12, curAmihud / curDayCount, treat, curVolSum / curSharesSum, curAbsDailyReturnSum, TREAT_START, curStartDate].join('\t'));
  };
  
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
      curStartDate = dateI;
      curVolSum = 0.0;
      curAbsDailyReturnSum = 0.0;
      curSharesSum = 0.0;
      curDayCount = 0;
      curAmihud = 0;
    }
    var openPrice = parseFloat(resI[COL_OPEN]);
    var closePrice = parseFloat(resI[COL_CLOSE]);
    var volume = parseFloat(resI[COL_VOL]);
    var shares = parseInt(resI[COL_SHARES]);
    curVolSum += volume;
    curAbsDailyReturnSum += Math.abs(closePrice / openPrice - 1) * 100;
    curSharesSum += shares;
    curAmihud += Math.abs(closePrice / openPrice - 1) * 100 / volume;
    curDayCount += 1;
  }
  outputCurFirmMonth();
  fs.writeFile(OUTPUT_FILE, output.join('\r\n'), function(err) {
    console.log('Data saved to ' + OUTPUT_FILE);
  });
});