import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // add api-key only for request to timely api
    
    if (!req.url.includes(environment.mainApiUrl)) {
      return next.handle(req);
    }

    const cloned = req.clone({
      setHeaders: {
        'X-Api-Key': environment.xApiKey,
      },
    });
    return next.handle(cloned);
  }
}
