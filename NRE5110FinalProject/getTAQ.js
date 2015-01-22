var TOTAL_ITEMS = 156;
var DATES = [
  new Date('6/30/2013'),
  new Date('9/30/2013'),
  new Date('12/31/2013'),
  new Date('3/30/2014'),
  new Date('6/30/2014'),
  new Date('9/30/2014'),
  new Date('12/31/2014')
];
var QUARTER = 0;
var START_DATE = DATES[QUARTER];
var END_DATE = DATES[QUARTER + 1];
var SPLIT_STOCKS = ['ABO', 'CPINV'];
var URL_LIST = 'https://www.euronext.com/pd/stocks/data?formKey=nyx_pd_filter_values:9dd8d9f06e09de0e925d10509a8c8642';
var URL_TAQ = 'https://www.euronext.com/nyx_eu_listings/price_chart/download_historical';
var ABRUPT_CHANGE_THRESHOLD = 0.5;
var TREAT_THRESHOLD = 50;
var TREAT_PERIOD = 0;
var THRESHOLD_PRECENT = 0.8;
var COL_DATE = 2;
var COL_SHARES = 7;
var COL_TRADES = 8;
var COL_TURNOVER = 9;
var OUTPUT_HEAD = false;

var nameArr = [];
var isinArr = [];
var symbolArr = [];
var treatmentArr = [];
var cntArr = []
var avgArr = [];
var sharesArr = [];
var tradesArr = [];
var turnoverArr = [];
var selectArr = [];
var startDayArr = [];
var symbolCnt;

var getList = function() {
  console.log('GETTING LIST');
  symbolCnt = 0;
  for(var i = 0; i * 20 < TOTAL_ITEMS; i++) {
    var param = {
      sEcho: i,
      iColumns: '7',
      sColumns: '',
      iDisplayStart: (i * 20).toString(),
      iDisplayLength: '20',
      iSortingCols: '1',
      iSortCol_0: '0',
      sSortDir_0: 'asc',
      bSortable_0: 'true',
      bSortable_1: 'false',
      bSortable_2: 'false',
      bSortable_3: 'false',
      bSortable_4: 'false',
      bSortable_5: 'false',
      bSortable_6: 'false',
    };
    $.post(URL_LIST, param, function(data) {
      // console.log(JSON.parse(data));
      var aaData = JSON.parse(data).aaData;
      // console.log(aaData);
      for(var j = 0; j < aaData.length; j++) {
        var curAaData = aaData[j];
        nameArr.push(curAaData[0].match(/upper-bold">([^<]+)/)[1]);
        isinArr.push(curAaData[1]);
        symbolArr.push(curAaData[2]);
        symbolCnt++;
        console.log(symbolCnt + ': ' + curAaData[2]);
      }
      if(symbolCnt == TOTAL_ITEMS) {
        // console.log(nameArr);
        // console.log(isinArr);
        getTaq();
      }
      
    });
  }
  for(var i = 0; i < TOTAL_ITEMS; i++) {
    selectArr[i] = true;
  }
};

var dataHandler = function(curI) {
  return (function(data) {
    data = data.split('\n');
    if(data.length < 1) {
      console.log('ERR: Data Unavailable. ' + symbolArr[curI]);
      return;
    }
    var cnt = 0;
    var avg = 0.0;
    var avgTreat = 0;
    var avgShares = 0;
    var avgTrades = 0;
    var avgTurnover = 0;
    var lastDayAvg = 0;
    var firstDay = true;
    for(var j = 0; j < data.length; j++) {
      // Invalid record
      if(data[j].indexOf('Euronext Brussels') <= 0) continue;
      var curData = JSON.parse('[' + data[j] + ']');
      var shares = parseInt(curData[COL_SHARES]);
      var trades = parseInt(curData[COL_TRADES]);
      var turnover = parseFloat(curData[COL_TURNOVER]);
      var dayAvg = turnover / shares;
      if(cnt > 0 && Math.abs(lastDayAvg / dayAvg - 1) > ABRUPT_CHANGE_THRESHOLD) {
        console.log('Abrupt Change: ' + symbolArr[curI] + ' from ' + lastDayAvg + ' to ' + dayAvg + ' on ' + curData[COL_DATE]);
        selectArr[curI] = false;
      }
      lastDayAvg = dayAvg;
      if(dayAvg > 100) continue;
      avg += dayAvg;
      cnt++;
      if(TREAT_PERIOD && dayAvg < TREAT_THRESHOLD) {
        avgTreat++;
      }
      avgShares += shares;
      avgTrades += trades;
      avgTurnover += turnover;
      if(firstDay) {
        firstDay = false;
        startDayArr[curI] = curData[COL_DATE];
      }
    }
    avgTreat /= cnt;
    avg /= cnt;
    avgShares /= cnt;
    avgTrades /= cnt;
    avgTurnover /= cnt;
    console.log('#' + curI + ': ' + [cnt, avg, avgTreat, symbolArr[curI], isinArr[curI], startDayArr[curI]].join('\t'));
    cntArr[curI] = cnt;
    treatmentArr[curI] = avgTreat;
    avgArr[curI] = avg;
    sharesArr[curI] = avgShares;
    tradesArr[curI] = avgTrades;
    turnoverArr[curI] = avgTurnover;
    symbolCnt++;
    if(symbolCnt == TOTAL_ITEMS) {
      dataScreen();
    }
  });
};

var getTaq = function() {
  console.log('GETTING TAQ');
  symbolCnt = 0;
  for(var i = 0; i < symbolArr.length; i++) {
    if(SPLIT_STOCKS.indexOf(symbolArr[i]) >= 0) {
      console.log('Split: ' + symbolArr[i]);
      selectArr[i] = false;
      continue;
    }
    (function() {
      var curI = i;
      var param = {
        'typefile': 'csv',
        'layout': 'vertical',
        'typedate': 'mdy',
        'separator': 'point',
        'mic': 'XBRU',
        'isin': isinArr[i],
        'name': nameArr[i],
        'namefile': 'Price_Data_Historical',
        'from': START_DATE.getTime(),
        'to': END_DATE.getTime(),
        'adjusted': '1',
        'base': '0'
      };
      var url = URL_TAQ + '?' + $.param(param);
      $.get(url, dataHandler(curI));
    })();
  }
};

var dataScreen = function() {
  // Get Maximum Cnt;
  var maxCnt = 0;
  for(var i = 0; i < TOTAL_ITEMS; i++) {
    if(cntArr[i] > maxCnt) maxCnt = cntArr[i];
  }
  var cntThreshold = maxCnt * THRESHOLD_PRECENT;
  console.log('Max cnt: ' + maxCnt);
  for(var i = 0; i < TOTAL_ITEMS; i++) {
    if(cntArr[i] < cntThreshold) {
      selectArr[i] = false;
    }
  }
};

var getOutput = function() {
  var output = [];
  if(OUTPUT_HEAD) {
    output.push(['quarter', 'name', 'isin', 'symbol', 'treat', 'cnt', 'avg', 'shares', 'trades', 'turnover'].join('\t'));
  }
  for(var i = 0; i < TOTAL_ITEMS; i++) {
    if(selectArr[i] == false) continue;
    output.push([
      QUARTER,
      nameArr[i],
      isinArr[i],
      symbolArr[i],
      treatmentArr[i],
      cntArr[i],
      avgArr[i],
      sharesArr[i],
      tradesArr[i],
      turnoverArr[i]
    ].join('\t'));
  }
  console.log('Total Records: ' + (output.length - 1));
  return output.join('\n');
};

var scfGetOutput = function(i) {
  dataScreen();
  scf.set(i, getOutput());
};

getList();