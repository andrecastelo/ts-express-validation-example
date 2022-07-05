import {
  Express,
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import { UsersController, ErrorController } from './controllers';
import { validateMiddleware } from './middleware';

/**
 * This function wraps the request handler in a promise resolution callback
 * so that we can properly handle async errors and avoid the code repetition.
 *
 * @param fn Request handler function
 * @returns RequestHandler
 */
const use =
  (fn: RequestHandler): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * This receives an express app, a router, and configures them to handle the
 * routes.
 *
 * @param app Express application
 * @param router Router
 */
export const routes = (app: Express, router: Router): void => {
  router.get('/errors/not-found', use(ErrorController.notFound));
  router.get('/errors/async-example', use(ErrorController.asyncExample));
  router.get(
    '/errors/server-unavailable',
    use(ErrorController.serverUnavailable)
  );

  router.post(
    '/users/function',
    use(UsersController.createWithValidateFunction)
  );
  router.post(
    '/users/middleware',
    validateMiddleware(UsersController.createValidation),
    use(UsersController.createWithMiddleware)
  );
};
