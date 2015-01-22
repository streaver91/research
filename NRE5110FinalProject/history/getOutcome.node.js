var fs = require('fs');

var FILE_INPUT = 'panel.txt';
var FILE_OUTPUT = 'outcome.txt';
var COL_SEASON = 0;
var COL_TIC = 1;
var COL_TREAT = 2;
var COL_AVG = 3;
var COL_LTINV = 26;
var COL_AT = 32;
var PLACEBO = 0;

if(PLACEBO) {
  FILE_INPUT = 'placebo_' + FILE_INPUT;
  FILE_OUTPUT = 'placebo_' + FILE_OUTPUT;
}

var data = [];

var outcomeArr = [];
var ticArr = [];
var avgArr = [];
var treatArr = [];

fs.readFile(FILE_INPUT, 'utf-8', function(err, res) {
  if(err) {
    console.log(err);
    return;
  }
  var res = res.split('\n');
  for(var i = 1; i < res.length; i++) {
    var curRes = res[i].split('\t');
    data.push(curRes);
  }
  for(var i = 0; i < data.length; i++) {
    if(data[i][COL_SEASON] != '1') continue;
    var curTic = data[i][COL_TIC];
    for(var j = 0; j < data.length; j++) {
      if(data[j][COL_SEASON] != '3') continue;
      if(data[j][COL_TIC] != curTic) continue;
      if(parseInt(data[j][COL_LTINV]) == 0 && parseInt(data[i][COL_LTINV]) == 0) continue;
      ticArr.push(curTic);
      avgArr.push(data[i][COL_AVG]);
      var totalAssets = parseFloat(data[i][COL_AT]);
      outcomeArr.push((parseFloat(data[j][COL_LTINV]) - parseFloat(data[i][COL_LTINV])) / totalAssets);
      treatArr.push(data[j][COL_TREAT]);
    }
  }
  var outputArr = [];
  for(var i = 0; i < ticArr.length; i++) {
    outputArr.push([ticArr[i], avgArr[i], outcomeArr[i], treatArr[i]].join('\t'));
  }
  fs.writeFile(FILE_OUTPUT, outputArr.join('\n'), function(err) {
    if(err) {
      console.log(err);
      return;
    }
    console.log('Data saved to ' + FILE_OUTPUT);
  });
});