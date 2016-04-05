var express = require('express');
var path = require('path');
var slash = require('slash');
var phantomjs = require('phantomjs');
var phantom = require('phantom');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('main',{title: 'test'});

  //phantomg which works
  //var phantom = require('phantom');
  //  phantom.create().then(function(ph) {
  //    ph.createPage().then(function(page) {
  //      page.open("http://127.0.0.1:2900/").then(function(status) {
  //        page.render('google.pdf').then(function() {
  //          console.log('Page Rendered');
  //          ph.exit();
  //        });
  //      });
  //    });
  //  });
});

router.get('/dlpdf', function(req, res, next) {
  res.render('index', {title: 'Test'});
  var phantom = require('phantom');
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open("http://127.0.0.1:2900/").then(function(status) {
        page.render('google.pdf').then(function() {
          console.log('Page Rendered');
          ph.exit();
        });
      });
    });
  });
});

module.exports = router;
