import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/Cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  cartDetalis: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getLoggedCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetalis = res.data;
      },
      error: () => {},
    });
  }

  removeItem(id: string): void {
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartDetalis = res.data;
        this.toastrService.error(' Item Remmoved Successfully ');
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  updateCount(id: string, count: number): void {
    this.cartService.updateItemsQuantity(id, count).subscribe({
      next: (res) => {
        this.cartDetalis = res.data;
      },
    });
  }
  clearCartItems(): void {
    this.cartService.clearCartItems().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cartDetalis = {} as ICart;
          this.toastrService.error(' Your Cart is Empty Now ');
          this.cartService.cartNumber.set(0);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
