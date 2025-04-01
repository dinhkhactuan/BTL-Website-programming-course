import { Router, Request, Response, NextFunction } from 'express';
import * as Authortication from "../app/controllers/AuthorticationControllers";
import { DeleteUser, DeleteUserMe, getAllUser, GetUser, UpdateAdmin, UpdateUser } from '../app/controllers/UserControllers';

const router: Router = Router();

router.post("/login", Authortication.login);
router.get("/logout", Authortication.logout);
router.post("/signup", Authortication.CreateUser);

router.use(Authortication.protect);

router.post("/createAdmin", Authortication.createAdmin);
router.delete("/deleteMe/:id", DeleteUserMe);
router.patch("/:id", UpdateUser);
router.patch("/admin/:id", UpdateAdmin);
router.get("/:id", GetUser);
router.get("/", getAllUser);
router.delete("/:id", DeleteUser);

router.use(Authortication.decentralization("admin"));

export default router;
