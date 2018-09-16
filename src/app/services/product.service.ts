import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private readonly _httpClient: HttpClient) {}

  /**
   * Function to get all the products
   * @param {number} page
   * @param {string} search
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

  /**
   * Function to edit a product
   * @param {number} idProduct
   * @param {any} data
   * @return {Observable}
   */
  editProduct(idProduct: number, data: any) {
    const url = environment.apiUrl + 'products/' + idProduct;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this._httpClient.put(url, data, { headers: headers });
  }

  /**
   * Function to add a product
   * @param {any} data
   * @return {Observable}
   */
  addProduct(data: any) {
    const url = environment.apiUrl + 'products';

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this._httpClient.post(url, data, { headers: headers });
  }
}
