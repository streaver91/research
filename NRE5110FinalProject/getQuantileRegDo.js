var fs = require('fs');

var items = [];
var OUTCOME_COLS = {
  're': 'retainedearnings',
  'cstk': 'commonstock',
  'ltinv': 'longterminvestments'
};
var QUANT_VAR = 'totalassets';
// var QUANT_VAR = 'turnover';
var NUM_OF_TILES = 4;
var OUTPUT_FILE = 'quantileRegDo.txt';

outStr = [];
outStr.push('log using D:\\Evanger\\Documents\\research\\NRE5110FinalProject\\quantReg2_' + QUANT_VAR + '.log');

var commonCmds = [
  'import delimited D:\\Evanger\\Documents\\research\\NRE5110FinalProject\\panel.txt, clear',
  'drop if totalassets <= 0',
  'sum totalassets , detail',
  'drop if totalassets <= r(p5) | totalassets >= r(p95)',
  'gen log_at = log(totalassets)',
  'encode symbol, gen(nn_sym)',
  'xtset nn_sym quarter'
];

if(QUANT_VAR != 'totalassets') {
  commonCmds.push('gen ' + QUANT_VAR + '2at = ' + QUANT_VAR + ' / totalassets');
  // commonCmds.push('gen ' + QUANT_VAR + '2at = ' + QUANT_VAR);
  commonCmds.push('xtile qtile = ' + QUANT_VAR + '2at , nq(' + NUM_OF_TILES + ')');
} else {
  commonCmds.push('xtile qtile = totalassets, nq(' + NUM_OF_TILES + ')');
}

for(var item in OUTCOME_COLS) {
  var rawName = OUTCOME_COLS[item];
  
  for(var i = 0; i < NUM_OF_TILES; i++) {
    outStr = outStr.concat(commonCmds);
    outStr.push('gen ' + rawName + '2at = ' + rawName + ' / totalassets');
    outStr.push([
      'drop if qtile != ' + (i + 1),
      'xtreg ' + rawName + '2at treat, fe',
      'xtreg ' + rawName + '2at log_at treat, fe'
    ].join('\r\n'));
  }
}
outStr.push('log close');

// TODO: 
// Output to file
fs.writeFile(OUTPUT_FILE, outStr.join('\r\n'), function(err) {
  console.log('Data saved to ' + OUTPUT_FILE);
});