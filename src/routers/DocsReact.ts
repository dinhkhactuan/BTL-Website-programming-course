import { Router, Request, Response, NextFunction } from 'express';
import { DocsController } from '../app/controllers/DocsControllers';

const router: Router = Router();

router.get("/:Docs", (req: Request, res: Response, next: NextFunction) => {
  DocsController(req, res, next);
});

export default router;
