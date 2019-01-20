var facebook = require('./facebook');
var models = require('../models');

module.exports = function(passport) {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions

  passport.serializeUser(function(user, done) {
    console.log('Serializing user: ');
    done(null, user.UserId);
  });

  passport.deserializeUser(function(id, done) {
    console.log('Deserializing user: ');
    models.users
      .find({
        where: {
          UserId: id
        }
      })
      .then(user => {
        done(null, user);
      })
      .catch(err => done(err, null));
  });
};
