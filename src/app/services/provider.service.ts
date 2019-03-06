import { Provider } from './../models/provider';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();
  constructor(public _http: HttpClient) { }

  getProvider(): Observable<Provider[]> {
    return this._http.get<Provider[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers, this._headers);
  }

  createProvider(provider: Provider) {
    const data: any = {
      'providerName': provider.providerName,
      'providerRtn': Number(provider.providerRtn),
      'providerPhone1': Number(provider.providerPhone1),
      'providerPhone2': Number(provider.providerPhone2),
      'providerEmail': provider.providerEmail,
      'providerContact': Number(provider.providerContact),
    };
    console.log(JSON.stringify(data));
    return this._http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers, data, this._headers);
  }

  updateProvider(idProvider: String) {
    return this._http.put(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers, idProvider , this._headers);
  }
  deleteProvider(idProvider: String) {
    return this._http.delete(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers + idProvider , this._headers)
  }
}
