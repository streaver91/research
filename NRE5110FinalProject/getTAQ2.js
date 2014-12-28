var _nameArr = [];
var _isinArr = [];
var _symbolArr = [];
var _treatmentArr = [];
var _cntArr = [];
var _cntAfterTreatStartArr = [];
var _avgArr = [];
var _symbolCnt;
var _selectArr = [];
var TOTAL_ITEMS = 155;
var THRESHOLD = 0.8;
var TOTAL_CNT = 507;
var TOTAL_DAY_AFTER = 184;
var ABRUPT_CHANGE_THRESHOLD = 0.2;

var getList = function() {
  var URL_LIST = 'https://www.euronext.com/pd/stocks/data?formKey=nyx_pd_filter_values:9dd8d9f06e09de0e925d10509a8c8642';
  _symbolCnt = 0;
  for(var i = 0; i * 20 < TOTAL_ITEMS; i++) {
    var param = {
      sEcho: i,
      iColumns: '7',
      sColumns: '',
      iDisplayStart: (i * 20).toString(),
      iDisplayLength: '20',
      iSortingCols: '1',
      iSortCol_0: '0',
      sSortDir_0: 'asc',
      bSortable_0: 'true',
      bSortable_1: 'false',
      bSortable_2: 'false',
      bSortable_3: 'false',
      bSortable_4: 'false',
      bSortable_5: 'false',
      bSortable_6: 'false',
    };
    $.post(URL_LIST, param, function(data) {
      // console.log(JSON.parse(data));
      var aaData = JSON.parse(data).aaData;
      // console.log(aaData);
      for(var j = 0; j < aaData.length; j++) {
        var curAaData = aaData[j];
        _nameArr.push(curAaData[0].match(/upper-bold">([^<]+)/)[1]);
        _isinArr.push(curAaData[1]);
        _symbolArr.push(curAaData[2]);
        _symbolCnt++;
        console.log(_symbolCnt + ': ' + curAaData[2]);
      }
      if(_symbolCnt == TOTAL_ITEMS) {
        console.log(_nameArr);
        console.log(_isinArr);
        getTaq();
      }
      
    });
  }
  for(var i = 0; i < TOTAL_ITEMS; i++) {
    _selectArr[i] = true;
  }
};

var getTaq = function() {
  var URL_TAQ = 'https://www.euronext.com/nyx_eu_listings/price_chart/download_historical';
  var TREAT_START_DATE = new Date('04/07/2014');
  _symbolCnt = 0;
  for(var i = 0; i < _symbolArr.length; i++) {
    (function() {
      var curI = i;
      var param = {
        'typefile': 'csv',
        'layout': 'vertical',
        'typedate': 'mdy',
        'separator': 'point',
        'mic': 'XBRU',
        'isin': _isinArr[i],
        'name': _nameArr[i],
        'namefile': 'Price_Data_Historical',
        'from': '1356998400000',
        'to': '1419379200000',
        'adjusted': '1',
        'base': '0'
      };
      var url = URL_TAQ + '?' + $.param(param);
      console.log(url);
      $.get(url, function(data) {
        data = data.split('\n');
        var cnt = 0;
        var avg = 0.0;
        var cntAfterTreatStart = 0;
        var avgTreat = 0;
        var lastDayAvg = 0;
        for(var j = 0; j < data.length; j++) {
          if(data[j].indexOf('Euronext Brussels') <= 0) continue;
          var curData = JSON.parse('[' + data[j] + ']');
          var date = new Date(curData[2]);
          var open = parseFloat(curData[3]);
          var high = parseFloat(curData[4]);
          var low = parseFloat(curData[5]);
          var close = parseFloat(curData[6]);
          var dayAvg = (open + high + low + close) / 4;
          if(cnt > 0 && Math.abs(lastDayAvg / dayAvg - 1) > ABRUPT_CHANGE_THRESHOLD) {
            console.log('Abrupt Change: ' + _symbolArr[curI] + ' from ' + lastDayAvg + ' to ' + dayAvg + ' on day ' + curData[2]);
            _selectArr[curI] = false;
          }
          lastDayAvg = dayAvg;
          if(dayAvg > 100) continue;
          avg += dayAvg;
          cnt++;
          if(TREAT_START_DATE < date) {
            cntAfterTreatStart++;
            if(dayAvg < 50) {
              avgTreat++;
            }
          }
        }
        avgTreat /= 1.0 * cntAfterTreatStart;
        avg /= 1.0 * cnt;
        console.log('#' + curI + ': ' + [cnt, cntAfterTreatStart, avgTreat].join('\t'));
        _cntArr[curI] = cnt;
        _cntAfterTreatStartArr[curI] = cntAfterTreatStart;
        _treatmentArr[curI] = avgTreat;
        _avgArr[curI] = avg;
        _symbolCnt++;
        if(_symbolCnt == TOTAL_ITEMS) {
          dataScreen();
        }
      });
    })();
  }
};

var dataScreen = function() {
  for(var i = 0; i < TOTAL_ITEMS; i++) {
    if(_cntArr[i] < THRESHOLD * TOTAL_CNT || _cntAfterTreatStartArr[i] < THRESHOLD * TOTAL_DAY_AFTER) {
      _selectArr[i] = false;
    }
  }
  for(var i = 0; i < TOTAL_ITEMS; i++) {
    // if(_selectArr[i] == false) continue;
    console.log('#' + i + ': ' + [_cntArr[i], _cntAfterTreatStartArr[i], _treatmentArr[i], _selectArr[i]].join('\t'));
  }
};

var getOutput = function() {
  var output = [];
  // output.push('TIC\tTREATMENT');
  for(var i = 0; i < TOTAL_ITEMS; i++) {
    if(_selectArr[i] == false) continue;
    output.push([_symbolArr[i], _treatmentArr[i], _avgArr[i]].join('\t'));
  }
  return output;
};

getList();