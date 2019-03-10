import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Brand } from '../models/product';
import { contentHeaders } from '../@config/header/header';
import { IntegrationURIS } from '../@config/endpoint/endpoints';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _headers = contentHeaders;
  private _endpoint: IntegrationURIS = new IntegrationURIS();
  constructor(public _http: HttpClient) { 
  }

  // OBTENER TODOS LOS PRODUCTOS
  getProducts(): Observable<Product[]>{
    return this._http.get<Product[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products, this._headers);
  }

    // INICIO OBTENER MANTENIMIENTOS NECESARIOS DE PRODUCTOS
  getTypeProduct() {
    return this._http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.typeProducts, this._headers);
  }

  getBrands(): Observable<Brand[]>{
    return this._http
    .get<Brand[]>(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productBrands, this._headers)
  }

  getStorages(){
    return this._http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.productStorages, this._headers);
  }

  getProviders() {
    return this._http.get(this._endpoint.integrationUris.base + this._endpoint.integrationUris.providers, this._headers);
  }

  // CREAR NUEVO PRODUCTO
  createProduct(products:Product){
    debugger
    let data: any = {
      "productCode": products.productCode,
      "productName": products.productName,
      "productCost": products.productCost,
      "productBrand": Number(products.productBrand),
      "providers": Number(products.providers),
      "storage": Number(products.storage),
      "typeProduct": Number(products.typeProduct)
    }
    console.log(JSON.stringify(data));
    return this._http.post(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products, data, this._headers);
  }

  // EDITAR PRODUCTOS
  updateProduct(idProduct:string){
    return this._http.put(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products, idProduct , this._headers);
  }

   // ELIMINAR PRODUCTOS
  deleteProduct(idProduct:string){
    return this._http.delete(this._endpoint.integrationUris.base + this._endpoint.integrationUris.products + idProduct , this._headers);
  }


}
