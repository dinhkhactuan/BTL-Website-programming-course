import { Request, Response, NextFunction } from 'express';
import APIFeatures from '../../utill/callApi';
import Coures from '../models/coures';
import * as handleFactory from "./handleFactory";

export const updateCoures = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updateCoures = await Coures.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateCoures) {
      res.status(404).json({
        status: 'failed',
        message: 'Coures not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      newUpdateCoures: updateCoures,
    });
  } catch (error) {
    next(error); 
  }
};

export const getAllCoures = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const fillter: Record<string, any> = {};

    const couresQuery:any = new APIFeatures(Coures.find(fillter), req.query)
      .fillter()
      .sort()
      .limitFields()
      .page();

    const doc = await couresQuery.query;

    res.status(200).json({
      status: 'success',
      Document: doc,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      error: err.message,
    });
  }
};

export const deleteCoures = handleFactory.DeleteResources(Coures as any);
export const newCoures = handleFactory.CreateResources(Coures as any);
export const getCoures = handleFactory.getResoures(Coures as any);
