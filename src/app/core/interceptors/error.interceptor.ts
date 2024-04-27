import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401:
                        // Handle unauthorized access
                        break;
                    case 404:
                        // Handle not found error
                        console.error('CANNOT FIND JSON FILE')
                        break;
                    default:
                        // Handle other errors
                        break;
                }
                throw (error);
            })
        );
    }
}