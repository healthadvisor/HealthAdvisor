var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../public/json/index.json'),function(err,data){
    if(err){
      console.log(err);
      return;
    }
    res.render('index',JSON.parse(data));
  });
});

router.get('/judge', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../public/json/questions.json'),function(err,data){
    if(err){
      console.log(err);
      return;
    }
    var params = {};
    params.questionsSets = JSON.parse(data);
    res.render('judge',params);
  });
});

router.get('/feature', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../public/json/features.json'),function(err,data){
    if(err){
      console.log(err);
      return;
    }
    var params = {};
    params.descriptions = JSON.parse(data);
    res.render('feature',params);
  });
});

router.get('/recuperate', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../public/json/recuperate.json'),function(err,data){
    if(err){
      console.log(err);
      return;
    }
    var params = {};
    params.recuperates = JSON.parse(data);
    res.render('recuperate',params);
  });
});

router.get('/prevention', function(req, res, next) {
  res.render('prevention');
});

router.get('/subhealth', function(req, res, next) {
  res.render('subhealth');
});

router.get('/statistics', function(req, res, next) {
  res.render('statistics');
});

module.exports = router;
