import { NextFunction, RequestHandler, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/Request';
import User from '../models/User';

export const verifyToken = (
  // TODO: fix typing
  req: CustomRequest & Request & any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token)
    return res
      .status(401)
      .send({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as unknown as Secret
    );
    req.user = decoded as unknown as User;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token.' });
  }
};
