// Combine treatment results into sas readable file

var request = require('request');
var fs = require('fs');

var cutoffs = [10, 50, 100];
var markets = ['BR'];
var rddCombinedSamples = [];
var procCnt = 0;
var outputFile = 'treatments.dat.txt';

for(var m = 0; m < markets.length; m++) {
	for(var c = 0; c < cutoffs.length; c++) {
		(function() {
			var category = markets[m] + cutoffs[c];
			fs.readFile('Cut' + cutoffs[c] + '.' + markets[m] + '.dat.js', 'utf-8', function(err, res) {
				if(err) {
					console.log(err);
					return;
				}
				res = JSON.parse(res);
				for(var i = 0; i < res.length; i++) {
					res[i].push(category);
					rddCombinedSamples.push(res[i].join('\t'));
				}
				procCnt++;
				if(procCnt == markets.length * cutoffs.length) {
					fs.writeFile(outputFile, rddCombinedSamples.join('\n'), function(err) {
						if(err) console.log(err);
						else console.log('Treatment data saved to ' + outputFile);
					});
				}
			});
		})();
	}
}