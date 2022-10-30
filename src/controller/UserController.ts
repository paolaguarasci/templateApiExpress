import { Request, Response } from 'express';

import { UserService } from '../service/UserService.js';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAll = async (req: Request, res: Response) => {
    const response = await this.userService.getAll();
    res.status(200).send(response);
  };

  public getById = async (req: Request, res: Response) => {
    const response = await this.userService.getById(req.params.id);
    res.status(200).send(response);
  };

  public create = async (req: Request, res: Response) => {
    console.log(req.body);
    const response = await this.userService.create(req.body);
    res.status(200).send(response);
  };

  public edit = async (req: Request, res: Response) => {
    const response = await this.userService.edit(req.params.id, req.body);
    res.status(200).send(response);
  };

  public delete = async (req: Request, res: Response) => {
    try {
      await this.userService.delete(req.params.id);
      res.status(204).json({ message: 'Ok' });
    } catch (e) {
      res.status(404).json({ message: 'error' });
    }
  };
}
