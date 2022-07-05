import { notFound, serverUnavailable } from '@hapi/boom';
import { Request, Response } from 'express';

const getSomeResourceElsewhere = () => {
  return new Promise((resolve) => setTimeout(resolve, 250)).then(() => {
    throw notFound('Resource not found');
  });
};

export const ErrorController = {
  notFound: (req: Request, res: Response) => {
    throw notFound();
  },
  asyncExample: async (req: Request, res: Response) => {
    const { data } = await getSomeResourceElsewhere();
    res.status(200).json(data);
  },
  serverUnavailable: (req: Request, res: Response) => {
    throw serverUnavailable();
  },
};
