import { Router } from 'express';
import UserController from '../controller/UserController.js';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.edit);
userRouter.delete('/:id', userController.delete);

export default userRouter;
