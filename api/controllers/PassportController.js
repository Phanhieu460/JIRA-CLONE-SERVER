var passport = require("passport");
var jwt = require("jsonwebtoken");
module.exports = {
  googleAuth: function (req, res) {
    passport.authenticate("google", {
      scope: ["email", "profile"],
      session: false,
    })(req, res);
  },

  googleCallback: function (req, res, next) {
    passport.authenticate(
      "google",
      { scope: ["email", "profile"], session: false },
      function (err, newUser) {
        if (err) {
          // redirect to login page
          res.send("Registered account");
        } else {
          console.log(newUser);
          const accessToken = jwt.sign({userId: newUser.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'})
          const data =JSON.stringify ({
            accessToken, success: true, newUser
          })
          res.redirect('http://localhost:3000/google?user='+ data)
        }
      }
    )(req, res, next);
  },
};

