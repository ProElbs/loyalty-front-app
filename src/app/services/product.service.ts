import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductService {
  constructor(private readonly _httpClient: HttpClient) {}

  /**
   * Function to get all the products
   * @param {number} page
   * @return {Observable}
   */
  getProducts(page: number, search: string): Observable<any> {
    const perPage = 20;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    if (search === undefined) {
      return this._httpClient.get(
        environment.apiUrl +
          'products?_format=json&start=' +
          start +
          '&limit=' +
          perPage,
        {
          observe: 'response'
        }
      );
    } else {
      return this._httpClient.get(
        environment.apiUrl +
          'products?_format=json&start=' +
          start +
          '&limit=' +
          perPage +
          '&search=' +
          search,
        {
          observe: 'response'
        }
      );
    }
  }
}
