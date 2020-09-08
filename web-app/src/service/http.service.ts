import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators/catchError';
import { _throw } from 'rxjs/observable/throw';
import * as toastr from 'toastr';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  get(url: string, options: any = {}): Promise<any> {
    return this.http
      .get(url, this.requestOptions(options))
      .pipe(
        catchError(
          error => _throw(this.popToast('Ops, tivemos um erro inesperado, tente mais tarde =)'))
        )
      )
      .toPromise();
  }

  requestOptions(options: { [key: string]: any }) {
    return {
      ...options,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
      })
      
    };
  }

  popToast(message) {
    toastr.error(message, 'Erro!');
  }
}
