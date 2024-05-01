import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userService.createUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await userService.getUserById(Number(id));

  if (!user) {
    return res.status(404).send('user not found');
  }

  res.json(user);
}
