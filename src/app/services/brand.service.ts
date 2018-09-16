import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private readonly _httpClient: HttpClient) {}

  /**
   * Function to get all the brands
   * @return {Observable}
   */
  getBrands(): Observable<any> {
    return this._httpClient.get(environment.apiUrl + 'brands');
  }
}
