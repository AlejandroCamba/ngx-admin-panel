import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  post(path: string, body: Object = {}, headers?): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body,
      { headers: headers || this.headers()}
    ).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.headers()}
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      { headers: this.headers()}
    ).pipe(catchError(this.formatErrors));
  }

  get(path: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}${path}`,
      { headers: this.headers()}
    ).pipe(catchError(this.formatErrors));
  }

  headers(): HttpHeaders {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    return new HttpHeaders(headers);
  }

  private formatErrors(error: any) {
    if (error.status == 403) {
      localStorage.clear();
    }
    return  throwError(error.error);
  }
}
