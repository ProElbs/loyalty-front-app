import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  constructor(private readonly _httpClient: HttpClient) {}

  /**
   * Function to get all the categories
   * @return {Observable}
   */
  getCategories(): Observable<any> {
    return this._httpClient.get(environment.apiUrl + 'categories');
  }
}
