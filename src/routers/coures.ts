import { Router, Request, Response, NextFunction } from 'express';
import * as couerControllers from '../app/controllers/coures';

const router: Router = Router();

router.patch("/:id", couerControllers.updateCoures);

router.get("/:id", couerControllers.getCoures);

router.delete("/:id", couerControllers.deleteCoures);

router.get("/", couerControllers.getAllCoures);

router.post("/", couerControllers.newCoures);

export default router;
