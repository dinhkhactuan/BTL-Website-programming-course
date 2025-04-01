import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users";

// Tạo token JWT
const CreateToken = (id: string): string => {
  return jwt.sign({ id }, "mk1", { expiresIn: '1d' }); // Tạo token với thời gian hết hạn
};

// Lưu token vào cookie
const SaveTokenCookie = async (user: any, statusCode: number, req: Request, res: Response): Promise<void> => {
  const token = CreateToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,  // Chỉ có thể truy cập từ server
    // expires: new Date() + 60 * 1000,  // Thời gian hết hạn (nếu cần)
  });

  // Xóa password và confirmpassword khỏi thông tin trả về cho client
  user.password = undefined;
  user.confirmpassword = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

// Login người dùng
export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { password, email } = req.body;
    if (!password || !email) return res.status(400).json({ message: "Email hoặc mật khẩu không hợp lệ" });

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "Người dùng không tồn tại",
      });
    }

    if (password !== user.password) {
      return res.status(400).json({
        status: "failed",
        message: "Vui lòng nhập đúng mật khẩu",
      });
    }

    SaveTokenCookie(user, 200, req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Tạo người dùng mới
export const CreateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const user = await User.create({ email, username, password, confirmpassword });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Không thể tạo người dùng mới",
      });
    }

    const token = CreateToken(user._id as any);
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

// Tạo người dùng admin
export const createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { username, email, password, confirmpassword, role } = req.body;

    if (!username || !email || !password || !confirmpassword || !role) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    if (role !== "admin") {
      return res.status(400).json({ message: "Vui lòng nhập đúng vai trò (admin)" });
    }

    const user = await User.create({ email, username, password, confirmpassword, role });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Không thể tạo người dùng admin",
      });
    }

    const token = CreateToken(user._id as any);
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Kiểm tra xem người dùng đã đăng nhập chưa
export const isLogin = async (req: any, res: any, next: NextFunction): Promise<any> => {
  if (req.cookies.jwt) {
    try {
      const token = jwt.verify(req.cookies.jwt, "mk1") as jwt.JwtPayload;
      if (!token) return next();

      const currentUser = await User.findById({ _id: token.id });
      if (!currentUser) return next();

      res.locals.user = currentUser;
      return next();
    } catch (error) {
      return next();
    }
  }

  if (req.user) {
    try {
      res.locals.user = req.user;
      return next();
    } catch (error) {
      return next();
    }
  }

  next();
};

// Middleware kiểm tra quyền truy cập
export const protect = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) return res.status(400).redirect("/login");

    const decode = jwt.verify(token, "mk1") as jwt.JwtPayload;
    const currentUser = await User.findById({ _id: decode.id });

    if (!currentUser) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    res.status(500).render("err", {
      msg: "Đã xảy ra lỗi khi kiểm tra quyền truy cập",
    });
  }
};

// Đăng xuất người dùng
export const logout = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  try {
    req.session.destroy((err) => {
      console.log("Session destroyed.");
    });

    res.cookie("jwt", "logout", {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({
      status: "failed logout",
      error,
    });
  }
};

// Kiểm tra phân quyền
export const decentralization = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction): any => {
    if (!roles.includes(req.user.role )) {
      return res.status(403).render("err", {
        msg: "Bạn không đủ quyền truy cập",
      });
    }
    next();
  };
};
