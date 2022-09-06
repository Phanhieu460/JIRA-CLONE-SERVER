'use strict';
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require('dotenv').config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;



passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:1337/user/google/callback`,
      // passReqToCallback: true
    },function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOne({ googleId: profile.id }, async function (err, user) {
        if (user) {
          const updatedUser = {
            fullname: profile.displayName,
            email: profile.emails[0].value,
          };
          await User.findOneAndUpdate(
            { _id: user.id },
            { $set: updatedUser },
            { new: true }
          ).then((result) => {
            return cb(err, result);
          });
        } else {
          const newUser = new User({
            googleId: profile.id,
            fullName: profile.displayName,
            email: profile.emails[0].value,
          });
          newUser.save().then((result) => {
            return cb(err, result);
          });
        }
      });
    }
  )
);
