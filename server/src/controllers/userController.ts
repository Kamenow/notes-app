import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;

  res.status(200);
  try {
    const user = await userService.createUser(email, password);
    console.log(user);
    res.json(user);
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

// export const getAllUsers  = (req: Request, res: Response) => {
//   const { body } = req;
//   const newUser = userService.createUser(body);
//   res.json(newUser);
// };

// export const updateUser = (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body } = req;
//   const updatedUser = userService.updateUser(id, body);
//   res.json(updatedUser);
// };

// export const deleteUser = (req: Request, res: Response) => {
//   const { id } = req.params;
//   userService.deleteUser(id);
//   res.json({ message: 'User deleted successfully' });
// };
