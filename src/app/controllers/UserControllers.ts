import { Request, Response, NextFunction } from 'express';
import User from "../models/Users";
import * as handleFactory from "./handleFactory";

export const UpdateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    console.log(req.body);
    const { password, confirmpassword } = req.body;
    
    if (password || confirmpassword) {
      return res.status(500).json({
        message: "không được chỉnh sủa mật khẩu",
      });
    }

    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newUser) return res.status(500).json("user ko tồn tại");
    res.status(200).json({
      status: "success",
      Document: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      err,
    });
  }
};

export const UpdateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (req.body.password || req.body.confirmpassword) {
      return res.status(500).json({
        message: "không được chỉnh sủa mật khẩu",
      });
    }

    if (!req.body.username || !req.body.email || !req.body.role) {
      return res.json("vui lòng nhập đủ thông tin");
    }

    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newUser) return res.status(500).json("user ko tồn tại");
    res.status(200).json({
      status: "success",
      Document: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      err,
    });
  }
};

export const DeleteUserMe = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newUser) return res.status(500).json("user ko tồn tại");
    res.status(200).json({
      status: "success",
      Document: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      err,
    });
  }
};

export const GetUser = handleFactory.GetUser(User as any);
export const getAllUser = handleFactory.getAllResources(User as any);
export const DeleteUser = handleFactory.DeleteResources(User as any);
