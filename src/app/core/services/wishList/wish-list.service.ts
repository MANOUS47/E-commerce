import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private httpClient: HttpClient) {}

  listNumber: WritableSignal<string> = signal('');

  baseUrl: string = 'https://ecommerce.routemisr.com';

  addProToWishlist(id: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }

  getLoggedWish(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/wishlist`);
  }
  removeWishListItem(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/api/v1/wishlist/${id}`);
  }
}
