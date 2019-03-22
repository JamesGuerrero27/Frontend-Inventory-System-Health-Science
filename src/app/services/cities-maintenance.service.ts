import { Cities } from './../models/provider';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitiesMaintenanceService {

  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();
  constructor(public _http: HttpClient) { }

  getCities(): Observable<Cities[]> {
    return this._http.get<Cities[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.cities, this._headers);
  }
  createCities(Cities: Cities) {
    console.log(JSON.stringify(Cities));
    return this._http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.cities, JSON.stringify(Cities), this._headers, )
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  // Actualizar bodega
  updateCities(cityId: number, Cities: Cities) {
    Cities.cityId = cityId;
    console.log('UpdateCities', JSON.stringify(Cities));
    return this._http.put(this._endpoint.integrationUris.base + this._endpoint.integrationUris.cities + '/' + cityId,  JSON.stringify(Cities), this._headers)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

