var fs = require('fs');

var outStr = [];

outStr.push('xtset ticnum season');

var dependentsStr = 'Total Revenue,Cost of Revenue,Gross Profit,Operating Expenses,Research Development,Selling General and Administrative,Total Operating Expenses,Operating Income or Loss,Operating Income or Loss,Total Other Income/Expenses Net,Earnings Before Interest And Taxes,Interest Expense,Income Before Tax,Net Income From Continuing Ops,Net Income,Cash And Cash Equivalents,Short Term Investments,Net Receivables,Inventory,Other Current Assets,Total Current Assets,Long Term Investments,Property Plant and Equipment,Goodwill,Intangible Assets,Accumulated Amortization,Other Assets,Total Assets,Accounts Payable,Short/Current Long Term Debt,Total Current Liabilities,Long Term Debt,Deferred Long Term Liability Charges,Total Liabilities,Common Stock,Retained Earnings,Total Stockholder Equity,Net Tangible Assets,Net Income,Depreciation,Changes In Accounts Receivables,Changes In Liabilities,Changes In Inventories,Changes In Other Operating Activities,Total Cash Flow From Operating Activities,Capital Expenditures,Investments,Other Cash flows from Investing Activities,Total Cash Flows From Investing Activities,Dividends Paid,Sale Purchase of Stock,Net Borrowings,Total Cash Flows From Financing Activities,Effect Of Exchange Rate Changes,Change In Cash and Cash Equivalents';

var dependents = dependentsStr.toLowerCase().replace(/[ \/]/g, '_').split(',');
var generatedDependents = [];
outStr.push('log using panel_fe.log');
outStr.push('gen book_value = total_assets - intangible_assets');

for(var i = 0; i < dependents.length; i++) {
	if(dependents[i].length >= 32 && dependents[i][31] == '_') {
		dependents[i] = dependents[i].substring(0, 31);
	}
	dependents[i] = dependents[i].substring(0, 32);
	generatedDependents[i] = dependents[i].substring(0, 20) + '2at_' + i;
	outStr.push('gen ' + generatedDependents[i] + ' = ' + dependents[i] + ' / total_assets');
}

for(var i = 0; i < dependents.length; i++) {
	outStr.push('xtreg ' + dependents[i] + ' log_at treat, fe');
	outStr.push('xtreg ' + generatedDependents[i] + ' treat, fe');
	outStr.push('xtreg ' + generatedDependents[i] + ' log_at treat, fe');
}

console.log(outStr.join('\n'));

fs.writeFile('panel_gen.do', outStr.join('\n'), function(err) {
	if(err) console.log(err);
	else console.log('Do file generated.');
});