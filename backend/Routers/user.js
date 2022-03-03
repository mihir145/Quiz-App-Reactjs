const express = require("express");
const { getUser, getUserById, updateUser } = require("../Controllers/user");
const router = express.Router();
const { isAdmin, isAuthenticated, isSignedin } = require("../Controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedin, isAuthenticated, getUser);

router.put("/user/:userId", isSignedin, isAuthenticated, updateUser);
module.exports = router;
