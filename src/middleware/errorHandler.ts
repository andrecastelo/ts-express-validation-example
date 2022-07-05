import { Response, Request, NextFunction } from 'express';
import { logger } from '../utils';

export const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const {
    message = 'Oops! Something went wrong',
    isBoom,
    output,
    data = null,
  } = error;
  logger.info({ data });

  if (isBoom) {
    // if the error is explicitly thrown
    return res.status(output.statusCode).json({
      message,
      data,
      success: false,
    });
  }

  // return generic error response for unexpected error
  return res.status(500).json({
    success: false,
    message,
  });
};
