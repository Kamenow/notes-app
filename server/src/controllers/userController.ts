import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userService.createUser(email, password);
  res.status(200).json(user);
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await userService.getUserById(Number(id));

  if (!user) {
    return res.status(404).send({ message: 'user not found' });
  }

  res.json(user);
}
