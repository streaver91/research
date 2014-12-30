var fs = require('fs');

var items = ['season', 'tic', 'treat', 'avg'];
var data = [];
var seasons = ['2013Sep', '2013Dec', '2014Mar', '2014Jun'];

// Divide whole process into 3 steps
var step = 0;
var titleLoaded = false;
var seasonLoadedCnt = 0;

var MODE = 'rdd';
var RDD_WINDOW = 10;
var LOCAL_LEFT = 0;
var LOCAL_RIGHT = 10;
var FILE_OUTPUT = 'panel.txt';
var FILE_INPUT = 'treatment.txt';
var PLACEBO = 0;

if(PLACEBO) {
  FILE_INPUT = 'placebo_' + FILE_INPUT;
  FILE_OUTPUT = 'placebo_' + FILE_OUTPUT;
}
if(MODE == 'rdd') FILE_OUTPUT = 'rdd' + RDD_WINDOW + '_' + FILE_OUTPUT;
if(MODE == 'la') FILE_OUTPUT = 'la' + LOCAL_LEFT + '_' + LOCAL_RIGHT + '_' + FILE_OUTPUT;


Array.prototype.unique = function() {
    var a = [];
    for ( i = 0; i < this.length; i++ ) {
        var current = this[i];
        if (a.indexOf(current) < 0) a.push(current);
    }

    this.length = 0;
    for ( i = 0; i < a.length; i++ ) {
        this.push( a[i] );
    }
    return this;
};


var loadTreatment = function() {
  
  fs.readFile(FILE_INPUT, 'utf-8', function(err, res) {
    if(err) {
      console.log(err);
      return;
    }
    
    res = res.split('\r\n');
    for(var i = 0; i < res.length; i++) {
      var curRec = res[i].split('\t');
      if(curRec.length != 3) return;
      for(var s = 0; s < 3; s++) {
        data.push([s, curRec[0], 0, curRec[2]]);
      }
      // season, tic, treat, avg
      data.push([s, curRec[0], curRec[1], curRec[2]]);
    }
    console.log('loadTreatment Finished');
    step++;
    bootstrap[step]();
    
  });
};

var loadReport = function() {
  for(var s = 0; s < 4; s++) {
    (function() {
      var curSeason = s;
      fs.readFile('BR_' + seasons[s] + '.csv', 'utf-8', function(err, res) {
        var res = res.split('\r\n');
        // Load Title Items
        if(titleLoaded == false) {
          items = items.concat(res[0].split(/,/));
          console.log(items);
          titleLoaded = true;
        }
        // Load Data
        for(var i = 1; i < res.length; i++) {
          var curRec = res[i].split(/,/);
          var tic = curRec[0];
          // console.log(tic);
          for(var t = 0; t < data.length; t++) {
            // Current data structure: season, tic, treat, avg
            if(tic == data[t][1] && curSeason == data[t][0]) {
              data[t] = data[t].concat(curRec);
            }
          }
        }
        seasonLoadedCnt++;
        if(seasonLoadedCnt == seasons.length) {
          step++;
          bootstrap[step]();
        }
      });
    })();
    
  }
};

var outputPanel = function() {
  // Data Screening Start
  // Remove unavailable data and assets = 0
  for(var i = data.length - 1; i > 0; i--) {
    if(data[i].length < 5 || parseInt(data[i][32]) == 0) {
      data.splice(i, 1);
    }
  }
  
  // Drop semi annual report in first half
  var toDrop = [];
  for(var i = 0; i < data.length; i++) {
    // Select season 1 and 3
    if(data[i][0] == 0 || data[i][0] == 2) continue;
    var curTic = data[i][1];
    var curSeason = parseInt(data[i][0]);
    for(var j = 0; j < data.length; j++) {
      if(data[j][1] != curTic) continue;
      if(parseInt(data[j][0]) + 1 != curSeason) continue;
      if(parseInt(data[j][32]) == parseInt(data[i][32])) {
        toDrop.push(j);
      }
    }
  }
  // Screen variables if rdd
  if(MODE == 'rdd') {
    for(var i = 0; i < data.length; i++) {
      var curAvg = parseFloat(data[i][3]);
      if(curAvg < 50 - RDD_WINDOW || curAvg > 50 + RDD_WINDOW) {
        toDrop.push(i);
      }
    }
  }
  console.log(toDrop.join(','));
  toDrop.sort(function(a, b) {
    return b - a;
  });
  console.log(toDrop.join(','));
  toDrop.unique();
  console.log(toDrop.join(','));
  for(var i = 0; i < toDrop.length; i++) {
    var curDropId = toDrop[i];
    data.splice(curDropId, 1);
  }
  // Data Screening End
  
  // Prepare output string
  for(var i = 0; i < data.length; i++) {
    data[i] = data[i].join('\t');
  }
  for(var i = 0; i < items.length; i++) {
    items[i] = items[i].replace(/\s/g, '_');
  }
  fs.writeFile(FILE_OUTPUT, [items.join('\t')].concat(data).join('\n'), function(err) {
    if(err) {
      console.log(err);
      return;
    }
    console.log('Data saved to ' + FILE_OUTPUT);
  });
};

var bootstrap = [
  loadTreatment,
  loadReport,
  outputPanel
];

bootstrap[step]();