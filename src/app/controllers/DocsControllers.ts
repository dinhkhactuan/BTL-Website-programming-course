import { Request, Response, NextFunction } from 'express';

export const DocsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({
      message: 'Doc controller working!'
    });
  } catch (error) {
    next(error);  
  }
};
