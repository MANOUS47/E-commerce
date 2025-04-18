import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProServiceService {
  constructor(private httpclinet: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpclinet.get(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }
  getSpecificProducts(id: string | null): Observable<any> {
    return this.httpclinet.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
}
