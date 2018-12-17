import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseService } from './base.services';

import { Currency } from '../models/Currency';
import { Coins } from '../models/Coins';
import { Conversion } from '../models/Conversion';
import { Result } from '../models/Result';

@Injectable()
export class ExternalService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }

    ObterComparativeCurrency(coinSource: string, coinTo: string): Observable<Currency>  {
        return this.http
          .get<Currency>(this.UrlService + 'Currency/GetComparativeCurrency?coinSource=' + coinSource + '&coinTo=' + coinTo)
          .pipe(
              map(data => data),
              catchError(super.serviceError)
            );
      }

    ObterCoins(): Observable<Coins[]>  {
        return this.http
          .get<Coins[]>(this.UrlService + 'coins/GetAllCoins')
          .pipe(
              map(data => data),
              catchError(super.serviceError)
            );
      }

    ObterBrazilianCoin(): Observable<Coins>  {
        return this.http
          .get<Coins>(this.UrlService + 'coins/GetBrazilianCoin')
          .pipe(
              map(data => data),
              catchError(super.serviceError)
            );
      }

    ConvertToCurrency(body: Conversion): Observable<Result> {
        const response = this.http.post<Result>(this.UrlService + 'Conversion/ConvertToCurrency', body, this.httpOptions)
        .pipe(
            catchError(super.serviceError)
        )

        return response;
    };
}

