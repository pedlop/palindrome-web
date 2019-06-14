import { Application, Request, Response, NextFunction } from 'express';

import { SERVER_RESPONSE } from '../../util/models/resolver.model';

export function mainRoute(app: Application): void {
  app.get('*', (request: Request, response: Response, next: NextFunction) => {
    if (request.url.endsWith('.map')) {
      response.status(404).end();
      return;
    } else {
      next();
    }
  });
  app.get('*', (req: Request, res: Response) => {
    const providers = [
      { provide: SERVER_RESPONSE, useValue: res }
    ];
    res.render('index', { req, res, providers });
  });
}
