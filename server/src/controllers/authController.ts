import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userService from '../services/userService';
import User from '../models/User';

export async function register(req: Request, res: Response) {
  const { email, password, rePassword } = req.body;

  try {
    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    if (password !== rePassword) {
      return res.status(400).send({ message: "Passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.build({ email, password: hashedPassword });
    await user.save();

    if (!process.env.TOKEN_SECRET) {
      return res.status(500).send({ message: 'Something went wrong' });
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1h'
      }
    );

    res.json(token);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (user === null) {
      return res.status(400).send({
        message: 'Wrong Credentials'
      });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).send({
        message: 'Wrong Credentials'
      });
    }

    if (!process.env.TOKEN_SECRET) {
      return res.status(500).send('Something went wrong');
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1h'
      }
    );

    res.json(token);
  } catch (error) {
    res.status(500).send(error);
  }
}
