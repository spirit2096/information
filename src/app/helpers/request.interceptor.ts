import { computed } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';

export const RequestInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // let _token = computed(() => {
  //   if (localStorage.getItem('jwt')) {
  //     return localStorage.getItem('jwt');
  //   } else {
  //     return '';
  //   }
  // });
  let authReq = request;

 
    // authReq = request.clone({
    //   setHeaders: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //     'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
    //   }
    // });
 
  return next(authReq);
}