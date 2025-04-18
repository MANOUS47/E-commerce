import { CategoriesService } from './../../core/services/Categories/categories.service';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProServiceService } from '../../core/services/products/pro-service.service';
import { Iproducts } from '../../shared/interfaces/IProducts';
import { Category } from '../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../core/services/wishList/wish-list.service';
@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    RouterLink,
    CurrencyPipe,
    SearchPipe,
    FormsModule,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly proService = inject(ProServiceService);
  private readonly cateService = inject(CategoriesService);
  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  likedProductIds: Set<string> = new Set();

  Products: WritableSignal<Iproducts[]> = signal([]);
  Category: WritableSignal<Category[]> = signal([]);

  searchText: string = '';

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 1500,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this.getProData();
    this.getCategoryData();
  }

  getProData(): void {
    this.proService.getAllProducts().subscribe({
      next: (res) => {
        this.Products.set(res.data);
      },
      error: (res) => {},
    });
  }
  getCategoryData(): void {
    this.cateService.getAllCateg().subscribe({
      next: (res) => {
        console.log(res.data);
        this.Category.set(res.data);
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success('Added Now in Cart', 'FreshCart... ');
          this.cartService.cartNumber.set(res.numOfCartItems);
          console.log(this.cartService.cartNumber());
        }
      },
    });
  }

  addToList(id: string): void {
    this.wishListService.addProToWishlist(id).subscribe({
      next: (res) => {
        this.wishListService;
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
