var xlsjs = require('xlsjs');
var fs = require('fs');
var async = require('async');

// Constants
var LIQ_RATIO_FILE = 'liqRatio.txt';
var EFFECTIVE_TICK_FILE = 'effectiveTick.txt';
var LIST_FILE = 'list.txt';
var PANEL_FILE = 'panel.txt';
var LIQ_RATIO_FILE_STRUCTURE = ['ISIN', 'MONTH', 'LIQ_RATIO', 'TREAT'];
var EFFECTIVE_TICK_FILE_STRUCTURE = ['ISIN', 'MONTH', 'EFFECTIVE_TICK', 'TREAT', 'AVG_PRICE'];
var LIST_FILE_STRUCTURE = ['ISIN', 'NAME', 'GROUP'];
var withItemName = true;

// Workbook Structure
var SHEETS_LIST = ['Balance Sheet', 'Income Statement', 'Cash Flow Statement', 'Ratios', 'Summary'];
var DATE_ROW = 7;
var DATE_START_COL = 3;
var ITEM_START_ROW = 9;
var MAX_ROW = 100;

// Separate Panel Data
var liqRatio = [];
var effectiveTick = [];
var treat = [];
var avgPrice = [];
var isinList = [];
var reportItemList = [];
var reportData = [];
var obsIdList = [];

// Get Previously Calculated Liquidity
var getLiquidity = function(callback) {
  console.log('GETTING LIQUIDITY');
  
  var _getLiqRatio = function(callback) {
    fs.readFile(LIQ_RATIO_FILE, 'utf-8', function(err, res) {
      res = res.split(/[\r]?\n/g);
      for(var i = 0; i < res.length; i++) {
        var curRes = res[i].split(/\t/g);
        var curIsin = curRes[LIQ_RATIO_FILE_STRUCTURE.indexOf('ISIN')];
        var curMonth = curRes[LIQ_RATIO_FILE_STRUCTURE.indexOf('MONTH')];
        var curLiqRatio = curRes[LIQ_RATIO_FILE_STRUCTURE.indexOf('LIQ_RATIO')];
        liqRatio[curMonth + '_' + curIsin] = curLiqRatio;
      }
      callback(null);
    });
  };
  
  var _getEffectiveTick = function(callback) {
    fs.readFile(EFFECTIVE_TICK_FILE, 'utf-8', function(err, res) {
      res = res.split(/[\r]?\n/g);
      for(var i = 0; i < res.length; i++) {
        var curRes = res[i].split(/\t/g);
        var curIsin = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('ISIN')];
        var curMonth = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('MONTH')];
        var curEffectiveTick = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('EFFECTIVE_TICK')];
        effectiveTick[curMonth + '_' + curIsin] = curEffectiveTick;
      }
      callback(null);
    });
  };
  
  // Get whether treated & average price
  var _getTreatInfo = function(callback) {
    fs.readFile(EFFECTIVE_TICK_FILE, 'utf-8', function(err, res) {
      res = res.split(/[\r]?\n/g);
      for(var i = 0; i < res.length; i++) {
        var curRes = res[i].split(/\t/g);
        var curIsin = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('ISIN')];
        var curMonth = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('MONTH')];
        var curTreat = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('TREAT')];
        var curAvgPrice = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('AVG_PRICE')];
        treat[curMonth + '_' + curIsin] = curTreat;
        avgPrice[curMonth + '_' + curIsin] = curAvgPrice;
      }
      callback(null);
    });
  };
  
  async.parallel([
    _getLiqRatio,
    _getEffectiveTick,
    _getTreatInfo
  ], function(err, res) {
    callback(null);
  });
};

// Get Financial Reports Data
var getReports = function(callback) {
  console.log('GETTING REPORT');
  
  var _getIsinList = function(callback) {
    fs.readFile(LIST_FILE, 'utf-8', function(err, res) {
      res = res.split(/[\r]?\n/g);
      for(var i = 0; i < res.length; i++) {
        var curRes = res[i].split(/\t/g);
        isinList.push(curRes[LIST_FILE_STRUCTURE.indexOf('ISIN')]);
      }
      callback(null);
    });
  };
  
  // Generate cell name (e.g. A1) from col and row number
  var _genCellName = function(col, row) {
    if(col <= 26) {
      return String.fromCharCode(64 + col) + row;
    } else {
      var high = Math.floor((col - 0.5) / 26);
      var low = col - 26 * high;
      return String.fromCharCode(high + 64, low + 64) + row;
    }
  };
  
  // Parse xls of certain isin
  var _parseWorkbook = function(curIsin) {
    console.log('Parsing: ' + curIsin);
    var workbook = xlsjs.readFile(__dirname + '\\Reports\\' + curIsin + '.xls');

    for(var i = 0; i < SHEETS_LIST.length; i++) {
      var curSheetName = SHEETS_LIST[i];
      var curSheet = workbook.Sheets[curSheetName];
      
      // Get report items
      for(var r = ITEM_START_ROW; r < MAX_ROW; r++) {
        var firstDataCell = curSheet[_genCellName(3, r)];
        if(firstDataCell != undefined) {
          var curItemCell = curSheet[_genCellName(1, r)];
          var curItem = [curSheetName[0], curItemCell.v.trim()].join('_');
          if(reportItemList.indexOf(curItem) == -1) {
            reportItemList.push(curItem);
          }
        }
      }
      
      // Get Data
      var curCol = DATE_START_COL;
      var curDateCell;
      while((curDateCell = curSheet[_genCellName(curCol, DATE_ROW)]) != undefined) {
        // Ignore original statement if restatement exists
        if(curDateCell.v.indexOf('original') != -1) {
          curCol += 1;
          continue;
        }
        // Obtain obsId
        var curDate = new Date(curDateCell.v.split(/[\r]?\n/g)[0]);
        var year = curDate.getFullYear();
        var month = curDate.getMonth() + 1;
        var time = year * 12 + month;
        var lookupId = time + '_' + curIsin;
        var obsId;
        if((obsId = obsIdList.indexOf(lookupId)) == -1) {
          obsIdList.push(lookupId);
          obsId = obsIdList.length - 1;
          reportData[obsId] = [];
        }
        
        // Deal with each data in the current date column
        var curDataCell;
        var curRow = ITEM_START_ROW;
        while(curRow < MAX_ROW) {
          curDataCell = curSheet[_genCellName(curCol, curRow)];
          if(curDataCell == undefined) {
            curRow++;
            continue;
          }
          
          // Obtain Item Id
          var curItem = [curSheetName[0], curSheet[_genCellName(1, curRow)].v.trim()].join('_');
          var itemId = reportItemList.indexOf(curItem);
          
          // Push into data matrix
          var curVal = curDataCell.v;
          if(curVal != '-') {
            reportData[obsId][itemId] = curVal;
          } else {
            reportData[obsId][itemId] = undefined;
          }
          curRow++;
        }
        
        // console.log(lookupId);
        curCol += 1;
      }
    }
    
  };

  var _getReports = function(callback) {
    for(var i = 0; i < isinList.length; i++) {
      var curIsin = isinList[i];
      try {
        _parseWorkbook(curIsin);
      } catch (err) {
        console.log(err);
        console.log('NOT FOUND: ' + curIsin);
      }
    }
    callback(null);
  };
  
  async.series([
    _getIsinList,
    _getReports
  ], function() {
    // console.log(reportItemList);
    callback(null);
  });
};

// Combine Data & Generate Panel.txt
var genPanel = function(callback) {
  console.log('GENERATING PANEL');
  var output = [];
  // Output title line
  if(withItemName) {
    var items = ['isin', 'month', 'liq_ratio', 'effective_tick', 'treat', 'avg_price'];
    for(var i = 0; i < reportItemList.length; i++) {
      items.push(reportItemList[i].toLowerCase().replace(/ /g, '_'));
    }
    output.push(items.join('\t'));
  }
  
  // Output Data
  for(var i = 0; i < obsIdList.length; i++) {
    var curLookupId = obsIdList[i];
    var curLookupIdArr = curLookupId.split('_');
    var curMonth = curLookupIdArr[0];
    var curIsin = curLookupIdArr[1];
    var curLiqRatio = liqRatio[curLookupId];
    var curEffectiveTick = effectiveTick[curLookupId];
    var curTreat = treat[curLookupId];
    var curAvgPrice = avgPrice[curLookupId];
    var curOutput = [curIsin, curMonth, curLiqRatio, curEffectiveTick, curTreat, curAvgPrice];
    for(var j = 0; j < reportItemList.length; j++) {
      curOutput.push(reportData[i][j]);
    }
    // console.log(curOutput);
    output.push(curOutput.join('\t'));
  }
  fs.writeFile(PANEL_FILE, output.join('\r\n'), function(err) {
    callback(null);
  });
  
};

// Main
async.series([
  getLiquidity,
  getReports,
  genPanel
], function() {
  console.log('DONE');
  console.log('DATA SAVED TO: ' + PANEL_FILE);
  debugger;
});