console.log('hi');

var request = require('request');
var fs = require('fs');
// -f File name
// -s Season
// var argv = require('optimist').demand('f').demand('s').argv;
var argv = require('optimist').demand('s').argv;

var tics, prices;
var volumns = [];
volumns.push(['tics', 'cnt', 'totvol', 'avgvol'].join('\t'));

var seasons = ['2013-3', '2013-4', '2014-1', '2014-2'];
var patt = [/2013-0[7-9]/, /2013-1[0-2]/, /2014-0[1-3]/, /2014-0[4-6]/][seasons.indexOf(argv.s)];

var outputFile = 'vol-' + argv.s + '.txt';

var calcAvgVolumn = function(month) {
	for(var t = 0; t < tics.length; t++) {
		if(prices[t]) {
			var sum = 0.0, cnt = 0;
			for(var d = 0; d < prices[t].length; d++) {
				if(patt.test(prices[t][d][0])) {
					cnt++;
					sum += prices[t][d][5];
				}
			}
			var rst = [tics[t], cnt, sum, sum / cnt];
			console.log(rst.join('\t'));
			if(cnt > 50) {
				volumns.push(rst.join('\t'));
			}
		}
	}
	fs.writeFile(outputFile, volumns.join('\n'), function(err) {
		if(err) console.log(err);
		else console.log('Volumn data saved to ' + outputFile);
	});
}

fs.readFile('BR.dat.js', 'utf-8', function(err, res) {
	if(err) {
		console.log(err);
		return;
	}
	res = JSON.parse(res);
	tics = res.tics;
	prices = res.prices;
	calcAvgVolumn(argv.m);
});