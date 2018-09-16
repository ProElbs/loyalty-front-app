import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductService {
  constructor(private readonly _httpClient: HttpClient) {}

  /**
   * Function to get all the products
   * @return {Observable}
   */
  getProducts(): Observable<any> {
    return this._httpClient.get(environment.apiUrl + 'products');
  }
}
