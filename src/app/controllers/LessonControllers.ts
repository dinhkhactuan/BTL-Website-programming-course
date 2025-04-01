import { Request, Response, NextFunction } from 'express';
import Lesson from "../models/lesson_name";
import { DeleteResources, getAllResources } from './handleFactory';

export const CreateLessonId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lesson:any = await Lesson.create({
      lessonName: req.body.lessonName,
      Idvideo: req.body.Idvideo,
    });

    lesson.Idvideo = `https://www.youtube.com/embed/${lesson.Idvideo}`;
    res.status(200).json({
      status: "success",
      lesson,
    });
  } catch (error) {
    next(error); 
  }
};

export const GetAllLessonId = getAllResources(Lesson as any);

export const DeleteLessonId = DeleteResources(Lesson as any);
