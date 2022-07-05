import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const UsersController = {
  create: (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    const user = { name, email };
    res.json(user);
  },
  createValidation: z.object({
    body: z.object({
      name: z.string().min(1).max(30),
      email: z.string().email().min(1),
    }),
  }),
};
