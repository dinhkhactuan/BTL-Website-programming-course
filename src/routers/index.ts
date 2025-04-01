import { Application } from "express";
import UserRouter from "./user";
import CouresRouter from "./coures";
import ViewRouter from "./viewRouter";
import LessonRouter from "./Lesson_nameRouter";
import FacebookRouter from "../app/controllers/Login_Application/Login_Facebook";
import GithubRouter from "../app/controllers/Login_Application/Login_Github";
import GoogleRouter from "../app/controllers/Login_Application/Login_Google";

function routes(app: Application): void {
  app.use("/api/v1/coures", CouresRouter);
  app.use("/api/v1/lesson", LessonRouter);
  app.use("/api/v1/user", UserRouter);
  app.use("/auth/facebook", FacebookRouter);
  app.use("/auth/github", GithubRouter);
  app.use("/auth/google", GoogleRouter);
  app.use("/", ViewRouter);

  app.all("*", (req, res) => {
    res.status(404).render("admin/404", {});
    // next(new appError(`loi ${req.originalUrl} can't not find`, 404))
  });
}

export default routes;
