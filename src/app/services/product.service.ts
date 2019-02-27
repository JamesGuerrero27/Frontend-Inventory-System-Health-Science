import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();
  constructor(public http: HttpClient) { 
    this.http=http;
  }

// OBTENER TODOS LOS PRODUCTOS
  getProducts(){
      return this.http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products, this._headers);
  }

    // INICIO OBTENER MANTENIMIENTOS NECESARIOS DE PRODUCTOS
  getTypeProduct() {
    return this.http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.typeProducts, this._headers);
  }

  getBrands(){
    debugger
    console.log(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productBrands, this._headers)
    return this.http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productBrands, this._headers);

  }

  getStorages(){
    return this.http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productStorages, this._headers);
  }

  getProviders() {
    return this.http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers, this._headers);
  }

  // CREAR NUEVO PRODUCTO
  createProduct(products:Product){
    return this.http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products, products , this._headers);
  }

  // EDITAR PRODUCTOS
  updateProduct(idProduct:string){
    return this.http.put(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products, idProduct , this._headers);
  }

   // ELIMINAR PRODUCTOS
   deleteProduct(idProduct:string){
    return this.http.delete(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products + idProduct , this._headers);
  }


}
