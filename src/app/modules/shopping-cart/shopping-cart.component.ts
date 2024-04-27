import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterPaths } from '../../app-router.model';
import { ShoppingCartService } from './services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ICartItem } from './models/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimize change detection
})
export class ShoppingCartComponent implements OnInit {
  cartItems$: Observable<ICartItem[]>;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {
    this.cartItems$ = this.shoppingCartService.getCartItems();
  }

  ngOnInit() { }

  getTotalPriceHT(cartItems: ICartItem[]) {
    let totalPriceHT = 0;
    cartItems.forEach(
      item => totalPriceHT += (item.priceHT * item.purchasedQuantity)
    );
    return totalPriceHT;
  }

  getTotalTaxes(cartItems: ICartItem[]) {
    let totalTaxes = 0;
    cartItems.forEach(
      item => totalTaxes += (item.taxe * item.purchasedQuantity)
    );
    return totalTaxes;
  }

  getTotalPriceTTC(cartItems: ICartItem[]) {
    let totalPriceTTC = 0;
    cartItems.forEach(
      item => totalPriceTTC += (item.priceTTC * item.purchasedQuantity)
    );
    return totalPriceTTC;
  }

  removeFromCart(productId: number) {
    this.shoppingCartService.removeFromCart(productId);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  redirectToProducts() {
    this.router.navigateByUrl(RouterPaths.PRODUCTS);
  }
}
