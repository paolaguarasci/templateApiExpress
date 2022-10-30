import { Router } from 'express';
import userRouter from './user.js';
const rootRouter = Router();

rootRouter.get('/', function (req, res) {
  res.status(200).json({ message: 'Welcome', success: true });
});

rootRouter.use('/users', userRouter);

export default rootRouter;
