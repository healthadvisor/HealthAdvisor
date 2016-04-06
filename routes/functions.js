var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* GET users listing. */
router.post('/testResult', function(req, res, next) {
  var answers = req.body.answers;
  var originalPoints = [];
  var convertedPoints = [];
  for(var i = 0; i < 9; i++){
    originalPoints[i] = 0;
    for(var j = 0; j < 7; j++){
      originalPoints[i] += parseInt(answers[7*i + j]);
    }
    convertedPoints[i] = calculatePoints(originalPoints[i]);
  }
  fs.readFile(path.join(__dirname, '../public/json/questions.json'),function(err,data){
    if(err){
      console.log(err);
      return;
    }
    var types = JSON.parse(data);
    var type = checkType(convertedPoints,types);
    res.send({type:type});
  });
});

function calculatePoints(originalPoint){
  return (originalPoint - 7)/(7 * 4) * 100;
}

function addToStatistic(i) {
  fs.readFile(path.join(__dirname, '../public/json/statistics.json'),function(err,data){
    if(err){
      console.log(err);
      return;
    }
    var statistics = JSON.parse(data);
    statistics[i]++;

    var buffer = "";
    buffer += "[";
    buffer += statistics;
    buffer += "]";
    fs.writeFile(path.join(__dirname, '../public/json/statistics.json'),buffer);

  });
}
function checkType(points,types){
  var physiqueType = "您的体质";
  var hasResult = false;
  var isGentleType = false;

  //判断有没有偏颇体质分数大于40的，如果有，就是它了
  for(i = 1; i < 9; i++){
    if(points[i] >= 40){
      addToStatistic(i);
      physiqueType = physiqueType + "是" + types[i].type + ",";
      hasResult = true;
    }
  }
  if(hasResult){
    if(physiqueType.charAt(physiqueType.length - 1) == ','){
      physiqueType = physiqueType.substring(0,physiqueType.length - 1);
    }

    return physiqueType;
  }

  //判断有没有偏颇体质大于30分，小于40分，那么就有那种体质的倾向
  //如果有，判断平和质是否大于50分，基本是平和质
  for(var i = 1; i < 9; i++){
    if((points[i] < 40)&&(points[i] >= 30)){
      //有偏颇体质大于30，小于40
      //判断平和质
      if(!isGentleType){
        if(points[0] > 50){
          physiqueType = physiqueType + "基本是" + types[0].type + ",";
        }
        isGentleType = true;
      }
      physiqueType = physiqueType + "有" + types[i].type + "倾向,";
      addToStatistic(0);
      hasResult = true;
    }
  }
  if(hasResult){
    if(physiqueType.charAt(physiqueType.length - 1) == ','){
      physiqueType = physiqueType.substring(0,physiqueType.length - 1);
    }
    return physiqueType;
  }

  //偏颇体质都小于30分
  //如果平和质大于50分，就是平和质
  //平和质小于50分，？？？找不到类型了
  if(points[0] >= 50){
    physiqueType = physiqueType + "是" + types[0].type;
    addToStatistic(0);
  }
  else{
    physiqueType += "尚不明确，请回你的火星去吧！";
  }
  return physiqueType;
}

router.get('/statistics',function(req, res, next){


  fs.readFile(path.join(__dirname, '../public/json/statistics.json'),function(err,data){
    if(err){
      console.log(err);
      return;
    }
    var statistics = JSON.parse(data);
    res.send({statistics:statistics});
  });
});

module.exports = router;
