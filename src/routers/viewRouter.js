const express = require("express");
const router = express.Router();
const viewControllers = require("../app/controllers/viewControllers");
const authorzicationControllers = require("../app/controllers/AuthorticationControllers");
const userControllers = require("../app/controllers/UserControllers");

router.get(
  "/Coures/:slug",
  authorzicationControllers.protect,
  viewControllers.pageDetail
);
router.get(
  "/CreateCoures",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  viewControllers.pageCreateCoures
);
router.get(
  "/editCoures",
  authorzicationControllers.protect,
  viewControllers.pageEditCoures
);
router.get("/signup", viewControllers.pageSignup);
router.get("/login", viewControllers.pageLogin);
router.get("/admin/profine", viewControllers.pageAdmin_Profine);
router.get("/admin/Dashboard", viewControllers.pageAdmin_Dashboard);
router.get("/Docs", viewControllers.pageDocs);
router.get(
  "/",
  authorzicationControllers.isLogin,
  viewControllers.pageOverView
);

module.exports = router;
