import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpClientBaseService {
    constructor(private http: HttpClient) { }

    buildHeader(opts: any): { [key: string]: any } {
        const token = localStorage.getItem('accessToken');
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'json',
            observe: 'response',
            ... (opts || {})
        };
        if (token) {
            options.headers.set('Authorization', 'Bearer ' + JSON.parse(token).access_token);
        }

        return options;
    }

    handleError(err: HttpErrorResponse): Observable<any> {
        return throwError(err.error || {
            status: 500,
            message: 'Server error'
        });
    }

    get<T>(url: string, opts?: any): Observable<T> {
        return this.http.get<any>(url, this.buildHeader(opts)).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(this.handleError)
        );
    }

    post<T>(url: string, params: any, opts?: any): Observable<T> {
        return this.http.post(url, params || {}, this.buildHeader(opts)).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(this.handleError)
        )
    }

    put<T>(url: string, params: any, opts?: any): Observable<T> {
        return this.http.put(url, params || {}, this.buildHeader(opts)).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(this.handleError)
        )
    }

    delete<T>(url: string, opts?: any): Observable<T> {
        return this.http.delete(url, this.buildHeader(opts)).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(this.handleError)
        )
    }

    patch<T>(url: string, params: any, opts?: any): Observable<T> {
        return this.http.patch(url, params, this.buildHeader(opts)).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }),
            catchError(this.handleError)
        )
    }
}