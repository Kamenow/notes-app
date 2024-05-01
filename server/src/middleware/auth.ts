import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthorizedRequest } from '../interfaces/Request';
import User from '../models/User';

export const verifyToken = (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!process.env.TOKEN_SECRET) {
    throw new Error('No jwt secret provided');
  }

  if (!token)
    return res
      .status(401)
      .send({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as User;
    req.user = decoded as User;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token.' });
  }
};
