import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInteceptor implements HttpInterceptor {
  //token
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  intercept(
    httpRequest: HttpRequest<unknown>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = httpRequest.clone({
      params: new HttpParams().set('auth', this.token),
    });

    return httpHandler.handle(httpRequest);
  }
}
