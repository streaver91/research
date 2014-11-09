// Get financial reports from Yahoo finance

var request = require('request');
var fs = require('fs');
var argv = require('optimist').demand('m').argv;

var markets = [];
// markets['BR'] = 'Brussels';
markets['LS'] = 'Lisbon';
var tics = [];
var reports = [];
var items = [];
items['is'] = ['Total Revenue', 'Cost of Revenue', 'Gross Profit'];
var cnt, tot;

var outputFile = argv.m + 'Report.dat.js';

// Fetch company report and call write when finished
var fetchReport = function(tic, retry) {
	if(retry <= 0) {
		cnt++;
		console.log('ERR: Unable to fetch ' + tic + '. (' + cnt + '/' + tics.length + ')');
		if(cnt == tics.length) {
			fs.writeFile(outputFile, JSON.stringify({items: items, reports: reports}), function(err) {
				if(err) console.log(err);
				else console.log('Data Saved to ' + outputFile);
			});
		}
		return;
	}
	for(var rep in items) {
		var url = 'http://finance.yahoo.com/q/' + rep + '?s=' + tic;
		console.log(url);
		request.get(url, function(err, res, html) {
			if(err || res.statusCode != 200) {
				setTimeout(function() {
					fetchReport(tic, retry - 1);
				}, 1000);
				return;
			}
			
		});
	}
}

// Read company list and call fetch report
cnt = 0;
for(var mkt in markets) {
	(function(mkt) {
		var inputFile = markets[mkt] + 'CompanyList.txt';
		fs.readFile(inputFile, 'utf-8', function(err, res) {
			if(err) return console.log(err);
			tics = res.split(/[\n\r ]+/);
			tot += tics.length;
			for(var t = 0; t < tics.length; t++) {
				fetchReport(tics[t] + '.' + mkt, 3);
			}
		});
	})(mkt);

}