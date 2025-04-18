import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { IWishList } from '../../shared/interfaces/iwish-list';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/Cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  wishListDetalis: WritableSignal<IWishList[]> = signal([]);

  ngOnInit(): void {
    this.getListData();
  }

  getListData(): void {
    this.wishListService.getLoggedWish().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishListDetalis.set(res.data);
      },
      error: () => {},
    });
  }

  addToCart(id: string): void {
    this.cartService.addProToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success('Added Now in Cart', 'FreshCart... ');
          this.cartService.cartNumber.set(res.numOfCartItems);
          console.log(this.cartService.cartNumber());
        }
      },
    });
  }

  removeItem(id: string): void {
    this.wishListService.removeWishListItem(id).subscribe({
      next: () => {
        this.wishListDetalis.set(
          this.wishListDetalis().filter((item) => item._id !== id)
        );
        this.toastrService.error('Item removed successfully');
      },
    });
  }
}
