import express, { Request, Response } from 'express';
import { CreateLessonId, DeleteLessonId, GetAllLessonId } from '../app/controllers/LessonControllers';

const router = express.Router();

router.get("/", GetAllLessonId);

router.post("/", CreateLessonId);

router.delete("/", DeleteLessonId);

export default router;
