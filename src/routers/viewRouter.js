const express = require("express");
const router = express.Router();
const viewControllers = require("../app/controllers/viewControllers");
const authorzicationControllers = require("../app/controllers/AuthorticationControllers");
const userControllers = require("../app/controllers/UserControllers");

router.get(
  "/Coures/:slug",
  // authorzicationControllers.protect,
  viewControllers.pageChitiet
);
router.get(
  "/coure-detail/:slug",
  authorzicationControllers.isLogin,
  viewControllers.pageXemchitiet
);
router.get(
  "/CreateCoures",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  viewControllers.pageCreateCoures
);
router.get("/signup", viewControllers.pageSignup);
router.get("/login", viewControllers.pageLogin);
router.get(
  "/about",
  authorzicationControllers.isLogin,
  viewControllers.Page_about
);
router.get(
  "/category",
  authorzicationControllers.isLogin,
  viewControllers.page_category
);
router.get(
  "/test",
  authorzicationControllers.isLogin,
  viewControllers.page_test
);
router.get(
  "/admin/profine",
  authorzicationControllers.protect,

  viewControllers.pageAdmin_Profine
);
router.get(
  "/admin/Dashboard",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  viewControllers.pageAdmin_Dashboard
);
router.get(
  "/Docs",
  authorzicationControllers.isLogin,
  viewControllers.pageDocs
);

router.get(
  "/",
  authorzicationControllers.isLogin,
  viewControllers.pageOverView
);

module.exports = router;
