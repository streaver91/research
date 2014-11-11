/*!
 * Get panel data
 * Treatment: avgPrice below $50 as treated (tick size < 0.01)
 * Ignore avgPrice > $100
 */
var fs = require('fs');

var tics, prices;

var outStr = [];
outStr.push(['season', 'tic', 'treat'].join('\t'));

var RDD = 0;

var seasonFilter = [/2013-0[6-9]/, /2013-1[0-2]/, /2014-0[1-3]/, /2014-0[4-6]/];

var getPanel = function() {
	for(var t = 0; t < tics.length; t++) {
		if(tics[t] == 'KIN') {
			// Split
			continue;
		}
		if(!prices[t]) {
			// Unavailable
			continue;
		}
		var curRst = [];
		for(var s = 0; s < 4; s++) {
			var avgPrice = 0, avgVol = 0, cnt = 0;
			var treat;
			for(var d = 0; d < prices[t].length; d++) {
				if(seasonFilter[s].test(prices[t][d][0])) {
					cnt++;
					avgPrice += (prices[t][d][1] + prices[t][d][4]) / 2;
					avgVol += prices[t][d][5];
				}
			}
			avgPrice /= cnt;
			avgVol /= cnt;
			if(avgPrice > 100) {
				// Ignore higher increase tick size
				continue;
			}
			if(avgPrice < 50) {
				treat = 1;
			} else {
				treat = 0;
			}
			if(RDD) {
				if(avgPrice < 20 || avgPrice > 80) {
					continue;
				}
			}
			var tmpRst = [s, tics[t], treat, avgVol];
			console.log(tmpRst.join('\t'));
			if(cnt > 50 && avgVol > 0) {
				outStr.push(tmpRst.join('\t'));
			}
		}
		if(curRst.length == 4) {
			outStr.push(curRst.join('\n'));
		}
	}
	fs.writeFile(RDD + 'ticPanel.dat.txt', outStr.join('\n'), function(err) {
		if(err) console.log(err);
		else console.log('Ticksize panel data saved');
	});
};

fs.readFile('BR.dat.js', 'utf-8', function(err, res) {
	if(err) {
		console.log(err);
		return;
	}
	res = JSON.parse(res);
	tics = res.tics;
	prices = res.prices;
	getPanel();
});