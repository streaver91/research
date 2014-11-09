// Get treatment variable from data

var request = require('request');
var fs = require('fs');
var argv = require('optimist').demand('f').demand('c').argv;

var cutoff = parseFloat(argv.c);
var tics, prices;
var rddSamples = [];
var outputFile = 'Cut' + argv.c + '.' + argv.f;

var calcTreatment = function(cutoff) {
	for(var t = 0; t < tics.length; t++) {
		var quotes = prices[t];
		if(quotes == null) continue;
		var treatAvg = 0.0;
		var high = 0.0, low = 10000.0;
		var open, close, x, cnt = 0;
		for(var d = 0; d < quotes.length; d++) {
			if(/2014-0[4-6]/.test(quotes[d][0]) == false) {
				continue;
			}
			cnt++;
			open = quotes[d][1];
			if(high < quotes[d][2]) high = quotes[d][2];
			if(low > quotes[d][3]) low = quotes[d][3];
			close = quotes[d][4];
			if(open > cutoff && close > cutoff) {
				treatAvg += 1.0;
			} else {
				x = (cutoff - open) / (close - open);
				if(open > cutoff) {
					treatAvg += x;
				} else if(close > cutoff) {
					treatAvg += 1 - x;
				}
			}
		}
		if(cnt == 0) {
			continue;
		}
		
		treatAvg /= cnt;
		
		if(high > cutoff && low < cutoff) {
			rddSamples.push([tics[t], treatAvg]);
			console.log('TIC: ' + tics[t] + ', treatAvg: ' + treatAvg + '; ' + cnt);
		}
	}
	fs.writeFile(outputFile, JSON.stringify(rddSamples), function(err) {
		if(err) console.log(err);
		else console.log('RDD sample saved to ' + outputFile);
	});
};

fs.readFile(argv.f, 'utf-8', function(err, res) {
	if(err) {
		console.log(err);
		return;
	}
	res = JSON.parse(res);
	tics = res.tics;
	prices = res.prices;
	calcTreatment(argv.c);
});
