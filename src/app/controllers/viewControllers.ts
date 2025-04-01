import { Request, Response, NextFunction } from 'express';
import Coures from "../models/coures";
import User from "../models/Users";
import Doc from "../models/Docs";
import Lesson from "../models/lesson_name";

export const pageOverView = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coures = await Coures.find({});
    res.status(200).render("home", {
      title: "home",
      coures,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageLogin = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findOne({ _id: req.user?.id });
    res.render("login", {
      title: "login",
      // user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).render("sign_up", {
      title: "signup",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const page_category = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coures = await Coures.find({});
    res.status(200).render("page_category", {
      title: "category",
      coures,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const Page_about = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).render("page_about", {
      title: "About",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const page_test = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).render("page_test", {
      title: "test",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const user_view = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).render("user_view", {
      title: "user",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const profile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).render("profile", {
      title: "User-profile",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageCreateCoures = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).render("admin/createCoures", {
      title: "createCoures",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const PageManagerCoures = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coures = await Coures.find({});
    res.status(200).render("admin/ManagerCoures", {
      title: "Update Coures",
      coures,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const PageUpdateCoures = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coures = await Coures.findOne({ _id: req.params.id });
    res.status(200).render("admin/UpdateCoures", {
      title: "Update Coures",
      coures,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const PageDeletecoures = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coures = await Coures.find({});
    res.status(200).render("admin/Delete_Coures", {
      title: "Delete Coures",
      coures,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const PageSystem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({});
    res.status(200).render("admin/System", {
      title: "System",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const Pagecreate_admin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).render("admin/CreateAdmin", {
      title: "Create Admin",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const PageEdit_admin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).render("admin/EditAdmin", {
      title: "Edit Admin",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageChitiet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reqslug = req.params.slug;
    const coures = await Coures.findOne({ slug: reqslug });
    const lesson = await Lesson.find({});
    res.status(200).render("pageChitiet", { coures, lesson });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageProfine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).render("pageProfine");
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageAdmin_Profine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).render("admin/profine");
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageAdmin_Dashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({});
    res.status(200).render("admin/Dashboard", {
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageManagerUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({});
    res.status(200).render("admin/ManagerUsers", {
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageDocs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coures = await Coures.find({});
    const docs = await Doc.find({});
    res.status(200).render("doc", {
      title: "Docs",
      coures,
      docs,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const pageXemchitiet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reqslug = req.params.slug;
    const coures = await Coures.findOne({ slug: reqslug });
    const lesson = await Lesson.find({});
    res.status(200).render("pageXemkhoahoc", {
      coures,
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};
