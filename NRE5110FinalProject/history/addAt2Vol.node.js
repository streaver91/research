var fs = require('fs');

var FILE_INPUT_1 = 'vol.stt.txt';
var FILE_INPUT_2 = 'BR_2014Jun.csv';
var FILE_OUTPUT = 'volAt.stt.txt';
var COL_TOTAL_ASSETS_2 = 29;
var COL_SYMBOL_1 = 6;
var COL_SYMBOL_2 = 0;
var COL_TOTAL_ASSETS_OUT = 7;
var COL_AVG_2 = 

var output = [];

fs.readFile(FILE_INPUT_1, 'utf-8', function(err, res) {
  if(err) {
    console.log(err);
    return;
  }
  res = res.split('\n');
  output.push(res[0].split('\t').concat('at').join('\t'));
  // console.log(output);
  for(var i = 1; i < res.length; i++) {
    var curRes = res[i].split('\t');
    output.push(curRes);
  }
  fs.readFile(FILE_INPUT_2, 'utf-8', function(err2, res2) {
    if(err2) {
      // console.log(err2);
      return;
    }
    res2 = res2.split('\r\n');
    // console.log(res2);
    // console.log(res2);
    // Add at2 to original 
    for(var i = 1; i < res2.length; i++) {
      var curRes2 = res2[i];
      if(curRes2 == '') continue;
      curRes2 = curRes2.split(',');
      console.log(curRes2);
      var symbol2 = curRes2[COL_SYMBOL_2];
      // console.log(symbol2 + '\t' + symbol);
      var at2 = parseInt(curRes2[COL_TOTAL_ASSETS_2]);
      for(var j = 1; j < output.length; j++) {
        var symbol = output[j][COL_SYMBOL_1];
        if(symbol == symbol2) {
          output[j].push(at2);
        }
      }
    }
    // Remove unavailable total assets
    for(var i = output.length -1; i > 0; i--) {
      if(output[i][COL_TOTAL_ASSETS_OUT] == undefined) {
        output.splice(i, 1);
      }
    }
    // Output Result
    for(var i = 1; i < output.length; i++) {
      output[i] = output[i].join('\t');
    }
    fs.writeFile(FILE_OUTPUT, output.join('\n'), function(err) {
      if(err) {
        console.log(err);
        return;
      }
      console.log('Data saved to ' + FILE_OUTPUT);
    });
  });
});