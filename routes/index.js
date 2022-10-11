var express = require('express');
const passport = require('passport');
var router = express.Router();
const localStrategy = require("passport-local")
const userModel = require("../models/users")
passport.use(new localStrategy({usernameField:'email'}, userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("login")
});

module.exports = router;
