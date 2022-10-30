import { Request, Response } from 'express';

import UserService from '../service/UserService.js';

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAll(req: Request, res: Response) {
    res.status(200).send({})
  }

  getById(req: Request, res: Response) {
    res.status(200).send({})
  }

  create(req: Request, res: Response) {
    res.status(200).send({})
  }

  edit(req: Request, res: Response) {
    res.status(200).send({})
  }

  delete(req: Request, res: Response) {
    res.status(200).send({})
  }
}
