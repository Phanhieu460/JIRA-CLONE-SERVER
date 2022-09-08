"use strict";
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

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
      callbackURL: `http://localhost:1337/user/google/callback`, //same URI as registered in Google console portal
      clientID: GOOGLE_CLIENT_ID, //replace with copied value from Google console
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({ id: profile.id });
        // if user exists return the user
        if (existingUser) {
          return done(null, existingUser);
        }
        // if user does not exist create a new user
        console.log("Creating new user...", profile.id);
        const newUser = await User.create({
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails[0].value,
          imgUrl: profile.photos[0].value
        }).fetch();
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : ACCESS_TOKEN_SECRET
},
function (jwtPayload, done) {

  //find the user in db if needed
  return User.findOneById(jwtPayload.id)
      .then(user => {
          return done(null, user);
      })
      .catch(err => {
          return done(err);
      });
}
));
