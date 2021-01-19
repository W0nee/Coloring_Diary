const express = require("express");
const router = express.Router();
const googlePassport = require("../config/googlePassport.js");
const naverPassport = require("../config/naverPassport.js");
const kakaoPassport = require("../config/kakaoPassport.js");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/google", googlePassport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", googlePassport.authenticate("google"), authSuccess);

router.get("/naver", naverPassport.authenticate("naver", { scope: ["profile"] }));
router.get("/naver/callback", naverPassport.authenticate("naver"), authSuccess);

router.get("/kakao", kakaoPassport.authenticate("kakao", { scope: ["profile"] }));
router.get("/kakao/callback", kakaoPassport.authenticate("kakao"), authSuccess);

function authSuccess(req, res) {
  res.redirect("/");
}

module.exports = router;
