import express from 'express';
import Logger from './logger';
import { constructFullUrl } from '../utils/requestUtils';

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch((err) => {
        Logger.error(`Request to ${constructFullUrl(req)} failed`, err);
        next(err);
      });
  };

const createRouter = () => ({
  router: express.Router(),
  execute: asyncMiddleware,
});

export default createRouter;
