import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from '../services/userService';
import User from '../models/User';

export async function register(req: Request, res: Response) {
  const { email, password, rePassword } = req.body;

  const existingUser = await userService.getUserByEmail(email);

  if (existingUser) {
    return res.status(400).send({
      data: {
        email: 'Email already registered'
      },
      message: 'Wrong Credentials'
    });
  }

  if (password !== rePassword) {
    return res.status(400).send({
      data: {
        password: "passwords don't match",
        rePassword: "passwords don't match"
      },
      message: 'Wrong Credentials'
    });
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
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (user === null) {
    return res.status(400).send({
      data: {
        email: "Email doesn't exist"
      },
      message: 'Wrong Credentials'
    });
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return res.status(400).send({
      data: {
        password: "passwords don't match",
        rePassword: "passwords don't match"
      },
      message: 'Wrong Credentials'
    });
  }

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
}
