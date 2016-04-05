var express = require('express');
var path = require('path');
var slash = require('slash');
var phantomjs = require('phantomjs');
var phantom = require('phantom');
var router = express.Router();



var renderPdf = function(session, cb) {
  var page;

  try {
    session.createPage(function(_page) {
      page = _page;
      // ...
      var file = '/tmp/file.pdf';
      page.render(file, function() {
        page.close();
        page = null;
        return cb(null, file);
      });
    });
  } catch(e) {
    try {
      if (page != null) {
        page.close(); // try close the page in case it opened but never rendered a pdf due to other issues
      }
    } catch(e) {
      // ignore as page may not have been initialised
    }
    return cb('Exception rendering pdf:' + e.toString());
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {

  renderPdf(req)

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
