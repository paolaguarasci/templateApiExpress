import { NextFunction, Request, Response } from 'express';

import UserService from '../service/UserService.js';

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({})
  }

  getById(req: Request, res: Response, next: NextFunction) {}

  create(req: Request, res: Response, next: NextFunction) {}

  edit(req: Request, res: Response, next: NextFunction) {}

  delete(req: Request, res: Response, next: NextFunction) {}
}
