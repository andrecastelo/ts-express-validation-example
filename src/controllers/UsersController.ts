import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { validateRequest } from '../utils';

export const UsersController = {
  createValidation: z.object({
    body: z.object({
      name: z.string().min(1).max(30),
      email: z.string().email().min(1),
    }),
  }),

  createWithMiddleware(req: Request, res: Response, next: NextFunction) {
    const { name, email } = req.body;
    const user = { name, email };
    res.status(204).json(user);
  },

  createWithValidateFunction(req: Request, res: Response, next: NextFunction) {
    const {
      body: { name, email },
    } = validateRequest(UsersController.createValidation, req);

    const user = { name, email };

    res.status(204).json(user);
  },
};
