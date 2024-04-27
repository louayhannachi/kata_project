import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './models/product';
import { PoductService } from './services/poduct.service';
import { Router } from '@angular/router';
import { RouterPaths } from '../../app-router.model';
import { Category } from './enums/category.enum';
import { ShoppingCartService } from '../shopping-cart/services/shopping-cart.service';
import { ICartItem } from '../shopping-cart/models/cart-item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  products$: Observable<IProduct[]>;
  purchasedItem$: Observable<ICartItem[]>;
  categories = Object.values(Category);

  constructor(
    private router: Router,
    private productService: PoductService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.products$ = this.productService.getProducts();
    this.purchasedItem$ = this.shoppingCartService.getCartItems();
  }

  ngOnInit() {
  }

  onCategoryChanged(category: string) {
    this.products$ = this.productService.getProductsByCategory(category);
  }

  addItemToCart(product: IProduct, quantity: number) {
    this.shoppingCartService.addToCart(product, quantity);
  }

  resetFilter(selectElement: HTMLSelectElement) {
    // Set the selected index to the first option and display all categories
    selectElement.selectedIndex = 0;
    this.products$ = this.productService.getProducts();
  }

  redirectToCart() {
    this.router.navigateByUrl(RouterPaths.SHOPPINGCART);
  }
}
