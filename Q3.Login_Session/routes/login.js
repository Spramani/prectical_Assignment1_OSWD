const express = require('express');
const router = express.Router();
const dbconnect = require('../utils/database');

router.get('/', (req, res, next) => {
  res.render('index', {
    pageTitle: 'Login',
  });
});

router.post('/checklogin', (req, res, next) => {
  var EmailId = req.body.EmailId;
  var Password = req.body.Password;
  if (EmailId && Password) {
    dbconnect.query('SELECT * FROM tbl_student WHERE email_id = ? AND password  = ?',
      [EmailId, Password],
      (error, results, fields) => {
        if (results.length > 0) {
          req.session.loggedId = true;
          req.session.username = results[0].stud_name;
          res.redirect("/home");
		      dbconnect.end();
        } else {
          res.send("Incorrect EmailId and/or Password");
        }
      });
  } else {
    res.send("Please enter EmailId and Password");
  }
});

router.get('/home', (req, res, next) => {
  if(req.session.loggedId) {
    res.render('home', {
      pageTitle: 'Home',
      loginName : req.session.username
    });
  } else {
    res.render('index', {
      pageTitle: 'Login',
    });
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if(err) {
      return next(err);
    } else {
      res.redirect("/");
    }
 })   
});

module.exports = router;