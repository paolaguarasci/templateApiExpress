import {Router} from 'express';

const rootRouter = Router();

rootRouter.get('/', function (req, res, next) {
  res.status(200).json({ message: 'Welcome', success: true });
});

export default rootRouter;
