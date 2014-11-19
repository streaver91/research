/*! Javascript Implementation of nnmatch
 *  Based on Abadie, Drukker, Herr and Imbens (2004)
 *  Author: Junhao Li <streaver91@gmail.com>
 * 	Input: Tab Delimited Text (with item titles in the first line)
 *  Platform Dependence: NodeJS
 */

// Variable Definitions (Change Accordingly)

var fileInput = 'fullData.txt';
var num_of_matches = 64;
// Column id counted from left to right start with 0
var treat = 1;
var matchItems = [];
var exact = 10;
var replace = 3;

// End Variable Definitions

var fs = require('fs');

var fullData = [];
var items = [];
var variances = [];
var means = [];
var treatedData = [];
var matchData = [];
var matchedData = [];
var replacedData = [];
var mnum = num_of_matches;

var nnmatch = function(data, treat, xArr, exact, replace) {
	var dist, distSort, tvec, curt, curm;
	means = [];
	variances = [];
	
	// Initialize
	for(var i = 0; i < items.length; i++) {
		variances.push(0.0);
		means.push(0.0);
	}
	
	// Calculate means
	for(var d = 0; d < data.length; d++) {
		var curData = data[d];
		for(var i = 0; i < items.length; i++) {
			means[i] += curData[i];
		}
	}
	console.log(means);
	
	// Calculate variances
	for(var i = 0; i < items.length; i++) {
		means[i] = means[i] / data.length;
		for(var d = 0; d < data.length; d++) {
			var tmp = data[d][i] - means[i];
			variances[i] += tmp * tmp;
		}
		variances[i] /= data.length;
	}
	console.log(variances);
	
	// Divide treated and untreated
	for(var d = 0; d < data.length; d++) {
		if(data[d][treat] == 1) {
			treatedData.push(data[d]);
		} else {
			matchData.push(data[d]);
		}
	}
	console.log(treatedData.length);
	console.log(matchData.length);
	
	// NNMatch Core
	for(var dt = 0; dt < treatedData.length && dt < 10000; dt++) {
		dist = [];
		distSort = [];
		curt = treatedData[dt];
		
		// Calculate distances
		for(var dm = 0; dm < matchData.length; dm++) {
			// Normal Match
			curm = matchData[dm];
			var curDist = 0, tmp;
			for(var mi = 0; mi < xArr.length; mi++) {
				tmp = (curm[xArr[mi]] - curt[xArr[mi]]);
				curDist += tmp * tmp / variances[xArr[mi]];
			}
			
			// Exact match (1000x weight)
			tmp = (curm[exact] - curt[exact]) * 1000;
			curDist += tmp * tmp / variances[exact];
			dist.push(curDist);
			distSort.push(curDist);
		}
		
		distSort.sort(function(a, b) {
			return (a - b > 0) ? 1 : -1;
		});
		
		// Prepare output
		for(var m = 0; m < mnum; m++) {
			var potentialMatch = matchData[dist.indexOf(distSort[m])];
			matchedData.push(potentialMatch);
			var curReplace = [];
			for(var dti = 0; dti < treatedData[dt].length; dti++) {
				curReplace.push(treatedData[dt][dti]);
			}
			curReplace[replace] = potentialMatch[replace];
			replacedData.push(curReplace);
			
		}
		console.log('Matched sample #' + dt);
	}
	
	// Output
	for(var mi = 0; mi < matchedData.length; mi++) {
		matchedData[mi] = matchedData[mi].join('\t');
		replacedData[mi] = replacedData[mi].join('\t');
	}
	fs.writeFile('nnMatchData_' + mnum + '.txt', matchedData.join('\n'), function(err) {
		if(err) console.log(err);
		console.log('Data Saved');
	});
	fs.writeFile('nnMatchDataReplace_' + mnum + '.txt', replacedData.join('\n'), function(err) {
		if(err) console.log(err);
		console.log('Data Saved');
	});
}

fs.readFile(fileInput, 'utf-8', function(err, res) {
	if(err) {
		console.log(err);
		return;
	}
	
	// Parse into 2D array
	fullData = res.split(/\r\n/);
	for(var d = 0; d < fullData.length; d++) {
		fullData[d] = fullData[d].split(/\t/);
		if(d == 0) continue;
		for(var i = 0; i < fullData[d].length; i++) {
			fullData[d][i] = parseFloat(fullData[d][i]);
		}
	}
	
	// Separate title and data
	items = fullData.splice(0, 1)[0];
	matchedData.push(items);
	replacedData.push(items);
	console.log(items);
	
	nnmatch(fullData, treat, matchItems, exact, replace);
});