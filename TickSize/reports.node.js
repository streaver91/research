var xlsjs = require('xlsjs');
var fs = require('fs');
var async = require('async');

var LIQ_RATIO_FILE = 'liqRatio.txt';
var EFFECTIVE_TICK_FILE = 'effectiveTick.txt';
var LIST_FILE = 'list.txt';
var PANEL_FILE = 'panel.txt';
var LIQ_RATIO_FILE_STRUCTURE = ['ISIN', 'MONTH', 'LIQ_RATIO', 'TREAT'];
var EFFECTIVE_TICK_FILE_STRUCTURE = ['ISIN', 'MONTH', 'EFFECTIVE_TICK', 'TREAT', 'AVG_PRICE'];
var LIST_FILE_STRUCTURE = ['ISIN', 'NAME', 'GROUP'];

var liqRatio = [];
var effectiveTick = [];
var treat = [];
var avgPrice = [];
var isinList = [];
var reportItemList = [];
var reportData = [];

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
        var curIsin = curRes[LIQ_RATIO_FILE_STRUCTURE.indexOf('ISIN')];
        var curMonth = curRes[LIQ_RATIO_FILE_STRUCTURE.indexOf('MONTH')];
        var curEffectiveTick = curRes[LIQ_RATIO_FILE_STRUCTURE.indexOf('EFFECTIVE_TICK')];
        effectiveTick[curMonth + '_' + curIsin] = curEffectiveTick;
      }
      callback(null);
    });
  };
  
  var _getTreatInfo = function(callback) {
    fs.readFile(EFFECTIVE_TICK_FILE, 'utf-8', function(err, res) {
      res = res.split(/[\r]?\n/g);
      for(var i = 0; i < res.length; i++) {
        var curRes = res[i].split(/\t/g);
        var curIsin = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('ISIN')];
        var curMonth = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('MONTH')];
        var curTreat = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('TREAT')];
        var curAvgPrice = curRes[EFFECTIVE_TICK_FILE_STRUCTURE.indexOf('AVG_PRICE')];
        treat[curMonth + curIsin] = curTreat;
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
  
  var _getReports = function(callback) {
    for(var i = 0; i < isinList.length; i++) {
      var curIsin = isinList[i];
      try {
        var workbook = xlsjs.readFile(__dirname + '\\Reports\\' + curIsin + '.xls');
        console.log(workbook.SheetNames);
        
      } catch (err) {
        console.log('NOT FOUND: ' + curIsin);
      }
    }
    callback(null);
  };
  
  async.series([
    _getIsinList,
    _getReports
  ], function() {
    callback(null);
  });
};

var genPanel = function(callback) {
  console.log('GENERATING PANEL');
  callback(null);
};

async.series([
  getLiquidity,
  getReports,
  genPanel
], function() {
  console.log('DONE');
  console.log('DATA SAVED TO: ' + PANEL_FILE);
  debugger;
});