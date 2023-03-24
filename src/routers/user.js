const express = require("express");
const router = express.Router();
const UserControllers = require("../app/controllers/UserControllers");
const Authortication = require("../app/controllers/AuthorticationControllers");
// const passport = require("passport");
//login logout facebook
// router.get("/auth/facebook", passport.authenticate("facebook"));
// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );

router.post("/login", Authortication.login);
router.get("/logout", Authortication.logout);
router.post("/signup", Authortication.CreateUser);
router.use(Authortication.protect);
router.delete("/deleteMe/:id", UserControllers.DeleteUserMe);
router.patch("/:id", UserControllers.UpdateUser);
router.get("/:id", UserControllers.GetUser);
router.get("/", UserControllers.getAllUser);
router.delete("/:id", UserControllers.DeleteUser);
router.use(Authortication.decentralization("admin"));

module.exports = router;
