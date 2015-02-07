var xls = require('xlsjs');
var fs = require('fs');

var workbook = xls.readFile('Reports/special/BE0003008019.xls');

var sheetNameList = workbook.SheetNames;
var sheet1A1 = workbook.Sheets[sheetNameList[0]]['A1'].v;

console.log(sheetNameList);