var fs = require('fs');

var PANEL_FILE = 'panel.txt';
var OUTCOME_FILE = 'outcome.txt';
var PANEL_LTINV_COL = 32;
var PANEL_SYMBOL_COL = 3;
var PANEL_QUARTER_COL = 0;
var PANEL_AVG_COL = 6;
var PANEL_TREAT_COL = 4;
var PANEL_AT_COL = 38;

var items = [];
var records = [];
var outcomes = [];

var loadPanel = function() {
  console.log('Loading Panel');
  fs.readFile(PANEL_FILE, 'utf-8', function(err, res) {
    res = res.split('\r\n');
    items = res[0].split('\t');
    // console.log(items);
    for(var i = 1; i < res.length; i++) {
      records.push(res[i].split('\t'));
    }
    calcOutput();
  });
};

var calcOutput = function() {
  console.log('Calculating Output');
  for(var i = 0; i < records.length; i++) {
    var treatRecord = records[i];
    if(treatRecord[PANEL_QUARTER_COL] != '3') continue;
    var treatSymbol = treatRecord[PANEL_SYMBOL_COL];
    // console.log(treatSymbol);
    var lastQuarter = -1;
    for(var j = 0; j < records.length; j++) {
      var matchRecord = records[j];
      if(matchRecord[PANEL_SYMBOL_COL] != treatSymbol) continue;
      if(j == i) continue;
      var matchQuarter = parseInt(matchRecord[PANEL_QUARTER_COL]);
      if(matchQuarter > lastQuarter) {
        lastQuarter = matchQuarter;
        var treatLevel = parseFloat(treatRecord[PANEL_LTINV_COL]) / parseFloat(treatRecord[PANEL_AT_COL]);
        var matchLevel = parseFloat(matchRecord[PANEL_LTINV_COL]) / parseFloat(matchRecord[PANEL_AT_COL]);
        var curOutcome = treatLevel - matchLevel;
        if(isNaN(curOutcome)) {
          console.log('ERROR: ' + [treatRecord[PANEL_AT_COL], matchRecord[PANEL_AT_COL]].join('\t'));
          break;
        }
        outcomes[treatSymbol] = [treatSymbol, treatRecord[PANEL_AVG_COL], curOutcome, treatRecord[PANEL_TREAT_COL]];
      }
    }
  }
  // console.log(outcomes);
  outStr = [['sym', 'avg', 'outcome', 'treat'].join('\t')];
  for(var outcome in outcomes) {
    outStr.push(outcomes[outcome].join('\t'));
  }
  fs.writeFile(OUTCOME_FILE, outStr.join('\r\n'), function(err) {
    console.log('Data saved to ' + OUTCOME_FILE);
  });
};

loadPanel();