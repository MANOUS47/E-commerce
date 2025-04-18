import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  cartNumber: WritableSignal<number> = signal(0);

  baseUrl: string = 'https://ecommerce.routemisr.com';

  addProToCart(id: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/cart`, {
      productId: id,
    });
  }

  getLoggedCart(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/cart`);
  }
  removeCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`);
  }
  clearCartItems(): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/api/v1/cart`);
  }
  updateItemsQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/api/v1/cart/${id}`, {
      count: newCount,
    });
  }
}
