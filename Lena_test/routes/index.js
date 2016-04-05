var express = require('express');
var path = require('path');
var slash = require('slash');
var phantomjs = require('phantomjs');
var phantom = require('phantom');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  var phantom = require('node-phantom');
  var html = ejs.render(htmlFileContent,
      {seller: "Sakshi Tyagi", buyer: "Test Buyer"});
  phantom.create(function (error, ph) {
    ph.createPage(function (error, page) {
      page.settings = {
        loadImages: true,
        localToRemoteUrlAccessEnabled: true,
        javascriptEnabled: true, 
        loadPlugins: false
      };
      page.set('viewportSize', { width: 800, height: 600 });
      page.set('paperSize', { format: 'A4', orientation: 'portrait', border: '1cm' });
      page.set('content', html, function (error) {
        if (error) {
          console.log('Error setting content: ', error);
        }
      });

      page.onResourceRequested = function (rd, req) {
        console.log("REQUESTING: ", rd[0]["url"]);
      }
      page.onResourceReceived = function (rd) {
        rd.stage == "end" && console.log("LOADED: ", rd["url"]);
      }
      page.onLoadFinished = function (status) {
        page.render(url, function (error) {
          if (error) console.log('Error rendering PDF: %s', error);
          console.log("PDF GENERATED : ", status);
          ph.exit();
          cb && cb();
        });
      }
    });
  });

  res.render('index', { title: 'Express' });

});

router.get('/dlpdf', function(req, res, next) {
  console.log('dlpdf');
  /*page.render('/tmp/file.pdf', function() {
    // file is now written to disk
  });*/



  res.render('index', {title: 'Test'});
});

module.exports = router;
