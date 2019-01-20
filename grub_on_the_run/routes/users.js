var express = require('express');
var router = express.Router();
const mysql = require('mysql').verbose();
var models = require('../models');
const auth = require("../config/auth");
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users
    .findOne({
      where: {
        Username: req.body.username
      }
    })
    .then(user => {
      if (user) {
        res.send('this user already exists');
      } else {
        models.users
          .create({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Email: req.body.email,
            Username: req.body.username,
            Password: hashedPassword
          })
          .then(createdUser => {
            const isMatch = createdUser.comparePassword(req.body.password);

            if (isMatch) {
              const userId = createdUser.UserId;
              console.log(userId);
              const token = auth.signUser(createdUser);
              res.cookie('jwt', token);
              res.redirect('profile/' + userId);
            } else {
              console.error('not a match');
            }
          });
      }
    });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    const isMatch = user.comparePassword(req.body.password)

    if (!user) {
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (isMatch) {
      const userId = user.UserId
      const token = auth.signUser(user);
      res.cookie('jwt', token);
      res.redirect('profile/' + userId)
    } else {
      console.log(req.body.password);
      res.redirect('login')
    }

  });
});

router.get('/profile/:id', auth.verifyUser, function(req, res, next) {
  // if (!req.isAuthenticated()) {
  //   return res.send('You are not authenticated');
  // }
  if (req.params.id !== String(req.user.UserId)) {
    res.send('This is not your profile');
  } else {
    let status;
    if (req.user.Admin) {
      status = 'Admin';
    } else {
      status = 'Normal user';
    }

    res.render('profile', {
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      Email: req.user.Email,
      UserId: req.user.UserId,
      Username: req.user.Username,
      Status: status
    });
  }
});

router.get('/logout', function (req, res) {
  res.cookie('jwt', null);
  res.redirect('/users/login');
});

router.get('/login/facebook', passport.authenticate('facebook', {
  session: true,
  failureRedirect: "/users/login"
}));

router.get(
  '/login/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/users/login'
  }),
  function (req, res) {
    const token = auth.signUser(req.user);
    res.cookie('jwt', token);
    res.redirect('/users/profile/' + req.user.UserId)
  }
);
module.exports = router;