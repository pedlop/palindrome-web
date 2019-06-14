
import { Inject, Injectable, PLATFORM_ID, Optional } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';

import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable({
  providedIn: 'root'
})
export class UniversalInterceptor implements HttpInterceptor {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(REQUEST) protected request: Request
  ) {
    if (!isPlatformServer(this.platformId)) {
      throw new Error('This interceptor can be used only on server context');
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let serverReq: HttpRequest<any> = req;
    if (this.request) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      if (!req.url.startsWith('/')) {
        newUrl += '/';
      }
      newUrl += req.url;
      serverReq = req.clone({
        url: newUrl
      });
    }
    return next.handle(serverReq);
  }

}
