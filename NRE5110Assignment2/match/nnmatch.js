/*! Javascript Implementation of nnmatch
 *  Based on Abadie, Drukker, Herr and Imbens (2004)
 *  Author: Junhao Li <streaver91@gmail.com>
 * 	Input: Tab Delimited Text (with item titles in the first line)
 *  Platform Dependence: NodeJS
 */

// Variable Definitions (Change Accordingly)

var fileInput = 'testData.txt';
var fileOutputPrefix = 'nn';
var num_of_matches = 4;
// Column id counted from left to right start with 0
var treat = 1;
// var matchItems = [0];
var matchItems = [3, 5, 7, 9];
var exact = 10;
var replace = 8;

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
			var curMatchReplace = [];
			for(var dti = 0; dti < items.length; dti++) {
				curMatchReplace.push(potentialMatch[dti]);
			}
			// Save cash flow replace to match file
			for(var dti = 0; dti < items.length; dti++) {
				if(dti == replace) {
					curMatchReplace.push(treatedData[dt][dti]);
				} else {
					curMatchReplace.push(potentialMatch[dti]);
				}
			}
			matchedData.push(curMatchReplace);
			
			// Save difference to origin replace file
			var curReplace = [];
			for(var dti = 0; dti < treatedData[dt].length; dti++) {
				curReplace.push(treatedData[dt][dti]);
			}
			curReplace[replace] = potentialMatch[replace];
			
			// Calculate Difference
			for(var dti = 0; dti < items.length; dti++) {
				curReplace.push(potentialMatch[dti] - treatedData[dt][dti]);
			}
			
			replacedData.push(curReplace);
		}
		console.log('Matched sample #' + dt);
	}
	
	// Output
	for(var mi = 0; mi < matchedData.length; mi++) {
		matchedData[mi] = matchedData[mi].join('\t');
		replacedData[mi] = replacedData[mi].join('\t');
	}
	fs.writeFile(fileOutputPrefix + 'MatchData_' + mnum + '.txt', matchedData.join('\n'), function(err) {
		if(err) console.log(err);
		console.log('Data Saved');
	});
	fs.writeFile(fileOutputPrefix + 'MatchDataReplace_' + mnum + '.txt', replacedData.join('\n'), function(err) {
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
	for(var d = fullData.length - 1; d > 0; d--) {
		if(fullData[d].length < 5) {
			fullData.splice(d, 1);
		}
	}
	for(var d = 0; d < fullData.length; d++) {
		fullData[d] = fullData[d].split(/\t/);
		if(d == 0) continue;
		for(var i = 0; i < fullData[d].length; i++) {
			fullData[d][i] = parseFloat(fullData[d][i]);
		}
	}
	
	// Separate title and data
	items = fullData.splice(0, 1)[0];
	var replacedDataItems = [];
	for(var i = 0; i < items.length; i++) {
		replacedDataItems.push(items[i]);
	}
	for(var i = 0; i < items.length; i++) {
		replacedDataItems.push('d_' + items[i]);
	}
	replacedData.push(replacedDataItems);
	matchedData.push(replacedDataItems);
	console.log(replacedData);
	
	nnmatch(fullData, treat, matchItems, exact, replace);
});