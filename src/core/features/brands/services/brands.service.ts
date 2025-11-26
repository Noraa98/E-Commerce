import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/brands';

  constructor(private _http: HttpClient) { }

  getAllBrands(): Observable<any> {
    return this._http.get(this.baseUrl);
}
}