import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpclinet: HttpClient) {}

  getAllCateg(): Observable<any> {
    return this.httpclinet.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }
  getSpecifCategories(id: string): Observable<any> {
    return this.httpclinet.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
  }
}
