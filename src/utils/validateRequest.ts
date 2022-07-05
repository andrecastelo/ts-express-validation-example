import { Request } from 'express';
import { AnyZodObject, z, ZodError } from 'zod';
import { badRequest } from '@hapi/boom';

export function validateRequest<T extends AnyZodObject>(
  schema: T,
  req: Request
): z.infer<T> {
  try {
    return schema.parse(req);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.message, error.format());
    }
    throw badRequest(JSON.stringify(error));
  }
}
