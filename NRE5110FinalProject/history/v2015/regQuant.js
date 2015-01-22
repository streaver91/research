var fs = require('fs');

var outStr = [];

var interestedVariables = ['interestexpense2at_11', 'commonstock2at_34', 'retainedearnings2at_35', 'changesinaccountsrec2at_40', 'longterminvestments2at_21'];
var NUM_OF_QUANTILE = 5;
// var QUANT_VAR = 'turnover';
var QUANT_VAR = 'totalassets';
outStr.push('log close');
outStr.push('log using D:\\Evanger\\Documents\\research\\NRE5110FinalProject\\v2015\\regQuant_' + QUANT_VAR + '.log');
for(var i = 0; i < interestedVariables.length; i++) {
  // TODO;
  
  for(var q = 0; q < NUM_OF_QUANTILE; q++) {
    var tempStr = [
      'import delimited D:\\Evanger\\Documents\\research\\NRE5110FinalProject\\v2015\\allVariableRegression.csv, clear',
      'encode symbol, gen(nn_sym)',
      'xtset nn_sym half',
      // 'gen log_at = log(totalassets)',
      'xtile qtile = ' + QUANT_VAR + ', nq(' + NUM_OF_QUANTILE + ')',
      'drop if qtile != ' + (q + 1),
      'xtreg ' + interestedVariables[i] + ' treat, fe',
      'xtreg ' + interestedVariables[i] + ' log_at treat, fe',
    ];
    outStr.push(tempStr.join('\n'));
    // break;
  }
  // break;
}

outStr.push('log close');

console.log(outStr.join('\n'));

fs.writeFile('regQuant_' + QUANT_VAR + '.do', outStr.join('\n'), function(err) {
	if(err) console.log(err);
	else console.log('Do file generated.');
});