import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, finalize, map, Observable } from 'rxjs';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService, private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.toastr.success('Request successful!', 'Success');
                }
                return event;
            }),
            catchError((error) => {
                this.toastr.error('An error occurred during the request.', 'Error');
                throw error;
            }),
            finalize(() => {
                this.spinner.hide();
            })
        );
    }
}