var fs = require('fs');

var fullData = [];
var items = [];
var variances = [];
var means = [];
var treatedData = [];
var matchData = [];
var matchedData = [];
var replacedData = [];
var mnum = 64;

var cashId = 8;

var nnmatch = function(data, treat, xArr, exact) {
	var dist, distSort, tvec, curt, curm;
	means = [];
	variances = [];
	for(var i = 0; i < items.length; i++) {
		variances.push(0.0);
		means.push(0.0);
	}

	for(var d = 0; d < data.length; d++) {
		var curData = data[d];
		for(var i = 0; i < items.length; i++) {
			means[i] += curData[i];
		}
	}
	console.log(means);
	for(var i = 0; i < items.length; i++) {
		means[i] = means[i] / data.length;
		for(var d = 0; d < data.length; d++) {
			var tmp = data[d][i] - means[i];
			variances[i] += tmp * tmp;
		}
		variances[i] /= data.length;
		// variances[i] = sqrt(variances[i]);
	}
	console.log(variances);
	for(var d = 0; d < data.length; d++) {
		if(data[d][treat] == 1) {
			treatedData.push(data[d]);
		} else {
			matchData.push(data[d]);
		}
	}
	console.log(treatedData.length);
	console.log(matchData.length);
	for(var dt = 0; dt < treatedData.length && dt < 10000; dt++) {
		dist = [];
		distSort = [];
		curt = treatedData[dt];
		for(var dm = 0; dm < matchData.length; dm++) {
			curm = matchData[dm];
			var curDist = 0, tmp;
			for(var mi = 0; mi < xArr.length; mi++) {
				tmp = (curm[xArr[mi]] - curt[xArr[mi]]);
				curDist += tmp * tmp / variances[xArr[mi]];
				// console.log(curDist);
			}
			// Exact match
			tmp = (curm[exact] - curt[exact]) * 1000;
			curDist += tmp * tmp / variances[exact];
			dist.push(curDist);
			distSort.push(curDist);
		}
		// console.log(dist);
		// console.log('Dist Calculated');
		distSort.sort(function(a, b) {
			return (a - b > 0) ? 1 : -1;
		});
		// console.log(distSort.slice(0, mnum));
		// var sortId = 0;
		for(var m = 0; m < mnum; m++) {
			var potentialMatch = matchData[dist.indexOf(distSort[m])];
			// if(potentialMatch[exact] != treatedData[i][exact]) {
				// console.log(potentialMatch);
				// console.log(tvec);
				// sortId++;
				// if(sortId >= distSort.length) {
					// console.log('Duplicate Match');
					// sortId = 0;
				// }
				// m--;
				// continue;
			// }
			// sortId++;
			matchedData.push(potentialMatch);
			var curReplace = [];
			for(var dti = 0; dti < treatedData[dt].length; dti++) {
				curReplace.push(treatedData[dt][dti]);
			}
			// Replace cash flow
			curReplace[cashId] = potentialMatch[cashId];
			replacedData.push(curReplace);
		}
		console.log('Matched sample #' + dt);
		// break;
	}
	for(var mi = 0; mi < matchedData.length; mi++) {
		// console.log(matchedData[i]);
		// console.log(replacedData[i]);
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

fs.readFile('fullData.txt', 'utf-8', function(err, res) {
	if(err) {
		console.log(err);
		return;
	}
	fullData = res.split(/\r\n/);
	for(var d = 0; d < fullData.length; d++) {
		fullData[d] = fullData[d].split(/\t/);
		if(d == 0) continue;
		for(var i = 0; i < fullData[d].length; i++) {
			fullData[d][i] = parseFloat(fullData[d][i]);
		}
	}
	items = fullData.splice(0, 1)[0];
	matchedData.push(items);
	replacedData.push(items);
	console.log(items);
	nnmatch(fullData, 1, [3,6,7,9], 10);
});