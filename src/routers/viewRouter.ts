import { Router, Request, Response, NextFunction } from 'express';
import * as authorzicationControllers from "../app/controllers/AuthorticationControllers";
import { Page_about, page_category, page_test, pageAdmin_Dashboard, pageAdmin_Profine, pageChitiet, Pagecreate_admin, pageCreateCoures, pageDocs, PageEdit_admin, pageLogin, PageManagerCoures, pageManagerUsers, pageOverView, pageSignup, PageSystem, PageUpdateCoures, pageXemchitiet, profile, user_view } from '../app/controllers/viewControllers';

const router: Router = Router();

router.get(
  "/Coures/:slug",
  authorzicationControllers.protect,
  pageChitiet
);

router.get(
  "/coure-detail/:slug",
  authorzicationControllers.isLogin,
  pageXemchitiet
);

router.get(
  "/admin/CreateCoures",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin", "manager"),
  pageCreateCoures
);

router.get(
  "/admin/UpdateCoures/:id",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin", "manager"),
  PageUpdateCoures
);

router.get(
  "/admin/ManagerCoures",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin", "manager"),
  PageManagerCoures
);

router.get(
  "/admin/system",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  PageSystem
);

router.get(
  "/admin/system/create_admin",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  Pagecreate_admin
);

router.get(
  "/admin/system/edit/:id",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  PageEdit_admin
);

// Public routes
router.get("/signup", pageSignup);
router.get("/login", pageLogin);
router.get(
  "/about",
  authorzicationControllers.isLogin,
  Page_about
);

router.get(
  "/category",
  authorzicationControllers.isLogin,
  page_category
);

router.get(
  "/test",
  authorzicationControllers.isLogin,
  page_test
);

router.get(
  "/user",
  authorzicationControllers.isLogin,
  user_view
);

router.get(
  "/user/profile",
  authorzicationControllers.isLogin,
  profile
);

// Admin Profile and Dashboard routes
router.get(
  "/admin/profine",
  authorzicationControllers.protect,
  pageAdmin_Profine
);

router.get(
  "/admin/Dashboard",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  pageAdmin_Dashboard
);

router.get(
  "/admin/manager-users",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  pageManagerUsers
);

// Docs route
router.get(
  "/Docs",
  authorzicationControllers.isLogin,
  pageDocs
);

// Home route
router.get(
  "/",
  authorzicationControllers.isLogin,
  pageOverView
);

export default router;
