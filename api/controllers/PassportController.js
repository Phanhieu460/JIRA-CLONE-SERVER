
var passport = require('passport');

module.exports = {

  googleAuth: function(req, res) {
    passport.authenticate('google', { scope: ['email', 'profile'], session: false })(req, res);
  },

  googleCallback: function(req, res, next) {
    passport.authenticate('google',{session: false}, function(err, user) {
      if(err) {
        // redirect to login page
        console.log('google callback error: '+err);
      } else {
        console.log('google credentials');
        console.log(user);
        res.json(user);
      }
    })(req, res, next);
  },

};