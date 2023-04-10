const Coures = require("../models/coures");
const User = require("../models/Users");
const Doc = require("../models/Docs");
const Lesson = require("../models/lesson_name");
const { isLogin } = require("./AuthorticationControllers");
exports.pageOverView = async (req, res, next) => {
  try {
    const coures = await Coures.find({});

    // const lesson = await Lesson.find({});
    res.status(200).render("home", {
      title: "home",
      coures,
      // lesson,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

exports.pageLogin = async (req, res, next) => {
  try {
    const user = User.findOne(User._id);
    // console.log(user);
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
exports.pageSignup = async (req, res, next) => {
  try {
    res.status(200).render("sign_up", {
      title: "signup",
    });
  } catch (error) {}
};
exports.page_category = async (req, res, next) => {
  try {
    const coures = await Coures.find({});
    res.status(200).render("page_category", {
      title: "category",
      coures,
    });
  } catch (error) {}
};
exports.Page_about = async (req, res, next) => {
  try {
    res.status(200).render("page_about", {
      title: "About",
    });
  } catch (error) {}
};
exports.page_test = async (req, res, next) => {
  try {
    res.status(200).render("page_test", {
      title: "test",
    });
  } catch (error) {}
};
exports.pageCreateCoures = async (req, res, next) => {
  try {
    res.status(200).render("admin/createCoures", {
      title: "createCoures",
    });
  } catch (error) {}
};
exports.pageChitiet = async (req, res, next) => {
  try {
    const reqslug = req.params.slug;

    const coures = await Coures.findOne({ slug: reqslug });
    const lesson = await Lesson.find({});
    res.status(200).render("pageChitiet", { coures, lesson });
  } catch (error) {
    console.log(error);
  }
};
exports.pageProfine = async (req, res, next) => {
  try {
    res.status(200).render("pageProfine");
  } catch (error) {}
};
exports.pageAdmin_Profine = async (req, res, next) => {
  // const user = await User.findById();
  // console.log(user);
  try {
    res.status(200).render("admin/profine");
  } catch (error) {
    console.log(error);
  }
};
exports.pageAdmin_Dashboard = async (req, res, next) => {
  try {
    res.status(200).render("admin/Dashboard");
  } catch (error) {
    console.log(error);
  }
};

exports.pageDocs = async (req, res, next) => {
  try {
    const coures = await Coures.find({});
    const docs = await Doc.find({});

    res.status(200).render("doc", {
      title: "Docs",
      coures,
      docs,
      // lesson,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};
exports.pageXemchitiet = async (req, res, next) => {
  try {
    const reqslug = req.params.slug;
    const coures = await Coures.findOne({ slug: reqslug });
    const lesson = await Lesson.find({});
    res.status(200).render("pageXemkhoahoc", {
      coures,
      lesson,
    });
  } catch (error) {
    console.log(error);
  }
};
