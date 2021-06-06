import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient, private configService: ConfigService) { 

  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.configService.getBaseUrl()}/products`);
  }
  getProductsById(id:number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.configService.getBaseUrl()}/products/${id}`);
  }
  getProductsByCategory(category:string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.configService.getBaseUrl()}/products/category/${category}`);
  }
  createProducts(product:Product){
  
  }

  updateProductById(product:Product,id:number): Observable<Product>{
    delete product.edit; 
    return this.httpClient.put<Product>(`${this.configService.getBaseUrl()}/products/update/${id}`, product);
  }

  createProduct(product:Product): Observable<Product>{
    delete product.edit; 
    return this.httpClient.post<Product>(`${this.configService.getBaseUrl()}/products/create`, product);
  }
}
