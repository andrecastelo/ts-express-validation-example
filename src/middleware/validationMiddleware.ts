import { badRequest, Boom } from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateMiddleware =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        throw new Boom('Bad Request', {
          statusCode: 400,
          data: error.format(),
        });
      }
      throw badRequest(JSON.stringify(error));
    }
  };
