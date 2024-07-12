const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup))

router.route("/login")
    .get(wrapAsync(userController.renderLoginForm))
    .post(saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
        userController.login
    )

router.get("/logout", userController.logout);

module.exports = router;