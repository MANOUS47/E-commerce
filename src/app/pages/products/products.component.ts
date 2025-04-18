import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProServiceService } from '../../core/services/products/pro-service.service';
import { Iproducts } from '../../shared/interfaces/IProducts';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { CartService } from '../../core/services/Cart/cart.service';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe, SearchPipe, FormsModule, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly proService = inject(ProServiceService);
  private readonly cartService = inject(CartService);

  likedProductIds: Set<string> = new Set();

  Products: WritableSignal<Iproducts[]> = signal([]);
  searchText: string = '';

  ngOnInit(): void {
    this.getProData();
  }

  getProData(): void {
    this.proService.getAllProducts().subscribe({
      next: (res) => {
        this.Products.set(res.data);
      },
      error: (res) => {},
    });
  }

  addToCart(id: string): void {
    this.cartService.addProToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartNumber.set(res.numOfCartItems);
          console.log(this.cartService.cartNumber());
        }
      },
    });
  }

  addToList(id: string): void {
    this.wishListService.addProToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  toggleLike(productId: string): void {
    if (this.likedProductIds.has(productId)) {
      this.likedProductIds.delete(productId);
    } else {
      this.likedProductIds.add(productId);
    }
  }

  isLiked(productId: string): boolean {
    return this.likedProductIds.has(productId);
  }

  onHeartClick(productId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.toggleLike(productId);
    this.addToList(productId);
  }
}
