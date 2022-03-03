var router = require("express").Router();
const { check } = require("express-validator");
const { Signup, Signin, signout } = require("../Controllers/auth");

router.post(
  "/signup",
  [
    check("email", "Email Is Required!").isEmail(),
    check("name", "Username Should be Minimum 3 Characters!").isLength({
      min: 3,
    }),
    check("password", "Password Should be Minimum 6 Characters!").isLength({
      min: 6,
    }),
  ],
  Signup
);

router.post(
  "/signin",
  [
    check("email", "Email Is Required!").isEmail(),
    check("password", "Password must be 6 character!").isLength({ min: 6 }),
  ],
  Signin
);

router.get("/signout", signout);

module.exports = router;
