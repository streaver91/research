var URL_TAQ = 'https://www.euronext.com/nyx_eu_listings/price_chart/download_historical';
var START_DATE = new Date('01/01/2010');
var END_DATE = new Date('12/31/2014');
var MIC_SPECIAL = [];
MIC_SPECIAL['BE0003818359'] = 'XAMS';

var output = [];
var total = 0, cnt = 0;

var getMic = function(isin) {
  if(/BE/.test(isin)) return MIC_SPECIAL[isin] || 'XBRU';
  if(/PT/.test(isin)) return MIC_SPECIAL[isin] || 'XLIS';
};

var dataHandler = function(isin) {
  return (function(data) {
    data = data.split(/[\r]?\n/);
    for(var i = 0; i < data.length; i++) {
      var curData = data[i];
      if(/Euronext/.test(curData)) {
        output.push(curData.replace(/\"/g, '').replace(/,/g,'\t'));
      }
    }
    cnt++;
    console.log(isin + ' finished. (' + cnt + '/' + total + ') Len: ' + output.length);
    if(cnt == total) {
      scf.set(1, output.join('\r\n'));
    }
  });
};

var getTaq = function() {
  var list = scf.get(0).split(/[\r]?\n/);
  for(var i = 0; i < list.length; i++) {
    if(list[i].length == 0) continue;
    var curList = list[i].split(/\t/);
    var isin = curList[0].trim();
    var name = curList[1];
    var param = {
      'typefile': 'csv',
      'layout': 'vertical',
      'typedate': 'mdy',
      'separator': 'point',
      'mic': getMic(isin),
      'isin': isin,
      'name': encodeURI(name),
      'namefile': 'Price_Data_Historical',
      'from': START_DATE.getTime(),
      'to': END_DATE.getTime(),
      'adjusted': '1',
      'base': '0'
    };
    var url = URL_TAQ + '?' + $.param(param);
    console.log(url);
    $.get(url, dataHandler(isin));
    total++;
  }
};

getTaq();