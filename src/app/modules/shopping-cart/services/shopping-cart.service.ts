import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, first, map, mergeMap } from 'rxjs';
import { IProduct } from '../../product/models/product';
import { ICartItem } from '../models/cart-item';
import { getTaxe } from '../../../shared/utils/shared-functions';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartSubject = new BehaviorSubject<ICartItem[]>([]);
  private cartItems: ICartItem[] = [];

  constructor() {}

  getCartItems(): Observable<ICartItem[]> {
    return this.cartSubject.asObservable();
  }

  getCartItemsById(productId: number): Observable<ICartItem> {
    return this.cartSubject.asObservable().pipe(
      mergeMap(items => items), 
      filter(item => item.product.id == productId),
      first()
    );
  }

  addToCart(product: IProduct, quantity: number) {
    const existingCartItem = this.cartItems.find((item) => item.product.id === product.id);

    if (existingCartItem) {
      // If the product already exists in the cart, update the quantity
      existingCartItem.purchasedQuantity = quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      const taxe = getTaxe(product);
      //add mapper
      const cartItem: ICartItem = {
        product: product,
        purchasedQuantity: quantity,
        taxe: taxe,
        priceHT: product.price ,
        priceTTC: product.price + taxe,
      };
      this.cartItems.push(cartItem);
    }

    // Emit the updated cart items
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

}
