const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
let User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: "83123808127-tmh1ukc5rep2rh00e7q7ig0tbgprg9me.apps.googleusercontent.com",
      clientSecret: "DI_aWHBo_hwqbjvXBuN1U72U",
      callbackURL: "/users/login/google/callback",
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log("profile: ", profile);
      // console.log("json stringify");
      // console.log(JSON.stringify(profile));
      // console.log("json parse");
      // let test = JSON.parse(JSON.stringify(profile));
      // console.log(test.name.givenName + " " + test.name.familyName);

      User.findOne({ id: profile.id }, (err, user) => {
        if (err) res.send(err);
        if (user) {
          done(null, user);
        } else {
          // let newUser = new User({ id: profile.id, displayName: profile.displayName });
          // newUser.save((err, user) => {
          //   if (err) res.send(err);
          //   done(null, user);
          // });

          User.create({ id: profile.id, displayName: profile.displayName }, (err, user) => {
            if (err) res.send(err);
            done(null, user);
          });
        }
      });
    }
  )
);

module.exports = passport;
