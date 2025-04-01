import { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';

interface DocumentType extends Document {
  password?: string;
  confirmpassword?: string;
}

export const getAllResources = (Model: Model<DocumentType>) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const doc = await Model.find({});
    res.status(200).json({
      status: "success",
      Document: doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const GetUser = (Model: Model<DocumentType>) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const doc = await Model.findById(req.params.id).select("+password");
    if (!doc) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    doc.confirmpassword = undefined; // Removing the password confirmation field for security
    res.status(200).json({
      status: "success",
      Document: doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const CreateResources = (Model: Model<DocumentType>) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: "success",
      Document: doc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const UpdateResources = (Model: Model<DocumentType>) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const doc = await Model.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!doc) {
      return res.status(404).json({ status: "failed", message: "Resource not found" });
    }

    res.status(200).json({
      status: "success",
      Document: doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const DeleteResources = (Model: Model<DocumentType>) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const doc = await Model.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      Document: doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

export const getResoures = (Model: Model<DocumentType>) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ status: "failed", message: "Resource not found" });
    }

    res.status(200).json({
      status: "success",
      Document: doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};
