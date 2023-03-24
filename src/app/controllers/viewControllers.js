const Coures = require("../models/coures");
const User = require("../models/Users");
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
exports.pageDocs = async (req, res, next) => {
  try {
    const coures = await Coures.find({});

    // const lesson = await Lesson.find({});
    res.status(200).render("Docs", {
      title: "Docs",
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
    res.status(200).render("login_dangnhap", {
      title: "signup",
    });
  } catch (error) {}
};

exports.pageEditCoures = async (req, res, next) => {
  try {
    res.status(200).render("editCoures", {
      title: "editCoures",
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
exports.pageDetail = async (req, res, next) => {
  try {
    const reqSlug = req.params.slug;
    const coures = await Coures.findOne({ slug: reqSlug });
    const lesson = await Lesson.find({});

    res.status(200).render("pageChitiet", {
      title: "pageDetail",
      coures,
      lesson,
    });
  } catch (error) {
    res.status(500).render("err", {
      msg: error,
    });
  }
};
// exports.pageProfine = async (req, res, next) => {
//   try {
//     res.status(200).render("pageProfine");
//   } catch (error) {}
// };
exports.pageAdmin_Profine = async (req, res, next) => {
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
