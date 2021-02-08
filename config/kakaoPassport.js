const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
let User = require("../models/User");

passport.use(
  new KakaoStrategy(
    {
      clientID: "40f49416515cac34fc348fdea7bc9411",
      // clientSecret: "AI5ks57hhI",
      callbackURL: "/users/login/kakao/callback",
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
