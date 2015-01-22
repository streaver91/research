// Get ticker list and download quotes data from Yahoo finance 

var request = require('request');
var fs = require('fs');
var argv = require('optimist').demand('f').demand('m').argv;

var tics = [];
var prices = [];
var treatments = [];
var cnt = 0;
var outputFile = argv.m + '.dat.js';

var fetchQuote = function(tic, market, retry) {
	if(retry <= 0) {
		cnt++;
		console.log('ERR: Unable to fetch ' + tic + '. (' + cnt + '/' + tics.length + ')');
		if(cnt == tics.length) {
			fs.writeFile(outputFile, JSON.stringify({tics: tics, prices: prices}), function(err) {
				if(err) console.log(err);
				else console.log('Data Saved to ' + outputFile);
			});
		}
		return;
	}
	var url = 'http://real-chart.finance.yahoo.com/table.csv?s=' + tic + '.' + market + '&a=00&b=1&c=2013&d=05&e=30&f=2014&g=d&ignore=.csv';
	request.get(url, function(err, res, dat) {
		if(err || res.statusCode != 200) {
			setTimeout(function() {
				fetchQuote(tic, market, retry - 1);
			}, 1000);
			return;
		}
		dat = dat.split('\n').slice(1);
		var ticId = tics.indexOf(tic);
		prices[ticId] = [];
		for(var d = 0; d < dat.length; d++) {
			if(dat[d].length < 1) {
				continue;
			}
			var dayQuote = dat[d].split(',');
			for(var i = 1; i <= 6; i++) {
				dayQuote[i] = parseFloat(dayQuote[i]);
			}
			prices[ticId].push(dayQuote);
		}
		cnt++;
		console.log('SUC: ' + tic + ' ' + dat.length + 'Recs. (' + cnt + '/' + tics.length + ')');
	});
};

fs.readFile(argv.f, 'utf-8', function(err, res) {
	if(err) return console.log(err);
	tics = res.split(/[\n\r ]+/);
	console.log('Total tic: ' + tics.length);
	for(var t = 0; t < tics.length; t++) {
		fetchQuote(tics[t], argv.m, 3);
	}
});

