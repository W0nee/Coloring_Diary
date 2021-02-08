const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
let User = require("../models/User");

passport.use(
  new NaverStrategy(
    {
      clientID: "omznwi_wBQ4F48d6SAq5",
      clientSecret: "AI5ks57hhI",
      callbackURL: "/users/login/naver/callback",
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log("profile: ", profile);

      User.findOne({ id: profile.id }, (err, user) => {
        if (err) res.send(err);
        if (user) {
          done(null, user);
        } else {
          let newUser = new User({ id: profile.id, displayName: profile.displayName });
          newUser.save((err, user) => {
            if (err) res.send(err);
            done(null, user);
          });
        }
      });
    }
  )
);

module.exports = passport;
