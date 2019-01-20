var FacebookStrategy = require('passport-facebook').Strategy;
var models = require('../models');
const passport = require('passport');

passport.use(new FacebookStrategy(
  {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/users/login/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true
    },

    function(access_token, refresh_token, profile, done) {
      models.users
        .findOne({
          where: {
            AuthId: profile.id
          }
        })
        .then(user => {
          let name = profile.displayName;
          let [firstName, ...lastName] = name.split(' ');
          lastName = lastName.join(' ');
          if (!user) {
            return models.users
              .create({
                AuthId: profile.id,
                FirstName: firstName,
                LastName: lastName
              })
              .then(user => {
                done(null, user);
              });
          } else {
            done(null, user);
          }
        })
        .catch(err => {
          if (err) {
            console.log('error');
            return done(err);
          }
        });
    }
  )
);