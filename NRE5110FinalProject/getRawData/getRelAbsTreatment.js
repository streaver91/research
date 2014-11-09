var fs = require('fs');
// -f File name
// var argv = require('optimist').demand('f').demand('s').argv;
// var argv = require('optimist').demand('f').argv;

var tics, prices;
var outStr = [];
outStr.push(['tics', 'cnt', 'relTics', 'absTics'].join('\t'));

var outputFile = 'tickRelAbs.dat.txt';

var calcTicksize = function(month) {
	for(var t = 0; t < tics.length; t++) {
		if(prices[t]) {
			var relSum = 0, absSum = 0, cnt = 0;
			for(var d = 0; d < prices[t].length; d++) {
				if(/2014-0[4-6]/.test(prices[t][d][0])) {
					cnt++;
					var avgPrice = (prices[t][d][1] + prices[t][d][4]) / 2;
					var absPrice;
					if(/2014-0[4-6]-0[1-6]/.test(prices[t][d][0])) {
						absPrice = 0.01;
					} else {
						if(avgPrice < 10) {
							absPrice = 0.001;
						} else if(avgPrice < 50) {
							absPrice = 0.005;
						} else if(avgPrice < 100) {
							absPrice = 0.01;
						} else {
							absPrice = 0.05;
						}
					}
					absSum += absPrice;
					relSum += absPrice / avgPrice;
				}
			}
			var rst = [tics[t], cnt, relSum / cnt, absSum / cnt];
			console.log(rst.join('\t'));
			if(cnt > 50) {
				outStr.push(rst.join('\t'));
			}
		}
	}
	fs.writeFile(outputFile, outStr.join('\n'), function(err) {
		if(err) console.log(err);
		else console.log('Ticksize data saved to ' + outputFile);
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
	calcTicksize();
});