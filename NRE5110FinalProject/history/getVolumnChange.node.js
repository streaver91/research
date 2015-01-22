var fs = require('fs');

var FILE_INPUT = 'treatment.txt';
var FILE_OUTPUT = 'vol.stt.txt';


fs.readFile(FILE_INPUT, 'utf-8', function(err, res) {
  if(err) {
    console.log(err);
    return;
  }
  res = res.split('\r\n');
  var output = [];
  output.push(['season', 'tic', 'treat', 'vol', 'trades', 'VPT', 'tic_symbol'].join('\t'));
  for(var i = 0; i < res.length; i++) {
    var curRes = res[i].split('\t');
    console.log(curRes);
    // curRes items: TIC, TREAT, AVG_PRICE, VOL1, TRADES1, VOL2, TRADES2
    var vol1 = parseInt(curRes[3]);
    var trades1 = parseInt(curRes[4]);
    var vol2 = parseInt(curRes[5]);
    var trades2 = parseInt(curRes[6]);
    var vpt1 = vol1 / trades1;
    var vpt2 = vol2 / trades2;
    output.push([0, i, 0, vol1, trades1, vpt1, curRes[0]].join('\t'));
    output.push([1, i, curRes[1], vol2, trades2, vpt2, curRes[0]].join('\t'));
  }
  fs.writeFile(FILE_OUTPUT, output.join('\n'), function(err) {
    if(err) {
      console.log(err);
      return;
    }
    console.log('Data saved to ' + FILE_OUTPUT);
  });
});