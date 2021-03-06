var fs = require('fs');

var TAQ_FILE = 'TAQ.txt';
var PANEL_FILE = 'panel.txt';
var REPORT_FILES = [
  'BR_2013Sep.csv',
  'BR_2013Dec.csv',
  'BR_2014Mar.csv',
  'BR_2014Jun.csv'
];
var REPORT_COUNT = 4;
var REPORT_START_QUARTER = 0;
var DATES = [
  new Date('6/30/2013'),
  new Date('9/30/2013'),
  new Date('12/31/2013'),
  new Date('3/30/2014'),
  new Date('6/30/2014'),
  new Date('9/30/2014'),
  new Date('12/31/2014')
];
var TAQ_X_COL = 3;
var TAQ_T_COL = 0;
var REPORT_X_COL = 0;
var KEY_COLS = [32, 38, 46, 45];

var items = [];
var records = [];

var loadTAQ = function() {
  console.log('Loading TAQ');
  fs.readFile(TAQ_FILE, 'utf-8', function(err, res) {
    res = res.split('\r\n');
    items = res[0].split('\t');
    // console.log(items);
    for(var i = 1; i < res.length; i++) {
      records.push(res[i].split('\t'));
    }
    loadReport();
  });
};

var loadReport = function() {
  console.log('Loading Report');
  var loadCount = 0;
  var combineReport = function(curQuarter, res) {
    console.log('Quarter: ' + curQuarter);
    res = res.split('\r\n');
    if(curQuarter == 0) {
      // Load items
      items = items.concat(res[0].split(/,/));
      // console.log(items);
    }
    for(var i = 1; i < res.length; i++) {
      var curRecord = res[i].split(/,/);
      var curComp = curRecord[REPORT_X_COL];
      for(var j = 0; j < records.length; j++) {
        if(curComp == records[j][TAQ_X_COL] && curQuarter == records[j][TAQ_T_COL]) {
          records[j] = records[j].concat(curRecord);
          break;
        }
      }
    }
    loadCount++;
    if(loadCount == REPORT_COUNT) {
      outputPanel();
    }
  };
  for(var i = REPORT_START_QUARTER; i < REPORT_COUNT + REPORT_START_QUARTER; i++) {
    (function() {
      var curQuarter = i;
      fs.readFile(REPORT_FILES[curQuarter], 'utf-8', function(err, res) {
        combineReport(curQuarter, res);
      });
    })();
  }
};

var outputPanel = function() {
  // Data Screen
  console.log('Data Screen');
  var validArr = [];
  for(var i = 0; i < records.length; i++) {
    if(records[i].length < 20) {
      validArr[i] = false;
    } else {
      validArr[i] = true;
    }
  }
  // TODO
  // Near Quarter Drop if same
  for(var c = 0; c < KEY_COLS.length; c++) {
    var curColumn = KEY_COLS[c];
    console.log('Remove duplicate: ' + items[curColumn]);
  }
  for(var i = 0; i < records.length; i++) {
    var firstRecord = records[i];
    if(firstRecord[TAQ_T_COL] % 2 == 1) continue;
    for(var j = 0; j < records.length; j++) {
      secondRecord = records[j];
      if(firstRecord[TAQ_X_COL] != secondRecord[TAQ_X_COL]) continue;
      if(parseInt(secondRecord[TAQ_T_COL]) != parseInt(firstRecord[TAQ_T_COL]) + 1) continue;
      var flag = false;
      for(var c = 0; c < KEY_COLS.length; c++) {
        var curColumn = KEY_COLS[c];
        if(firstRecord[curColumn] != secondRecord[curColumn]) {
          flag = true;
          break;
        }
      }
      if(flag == false) {
        console.log('Drop: #' + i + ' ' + firstRecord[TAQ_X_COL] + ' ' + firstRecord[TAQ_T_COL]);
        validArr[i] = false;
      }
      break;
    }
  }
  console.log('Preparing Output');
  var outStr = [];
  outStr.push(items.join('\t'));
  for(var i = 0; i < records.length; i++) {
    if(validArr[i]) outStr.push(records[i].join('\t'));
  }
  fs.writeFile(PANEL_FILE, outStr.join('\r\n'), function(err) {
    console.log('Data saved to ' + PANEL_FILE);
  });
};

loadTAQ();