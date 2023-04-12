const express = require("express");
const router = express.Router();
const UserControllers = require("../app/controllers/UserControllers");
const Authortication = require("../app/controllers/AuthorticationControllers");

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
