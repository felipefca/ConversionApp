import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export abstract class BaseService {
    constructor() {
    }

    protected UrlService: string = environment.urlService;

    protected httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json'  })};

    protected serviceError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(error);
        return Observable.throw(error);
    }
}
