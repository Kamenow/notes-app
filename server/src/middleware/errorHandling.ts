import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = error.message ? error.message : 'Something went wrong';
  const statusCode = req.statusCode ? req.statusCode : 500;

  res.status(statusCode).json({ message: errorMessage });
};
