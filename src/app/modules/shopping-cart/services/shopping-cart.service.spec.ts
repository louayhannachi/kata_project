import { ShoppingCartService } from './shopping-cart.service';
import { IProduct } from '../../product/models/product';
import { ICartItem } from '../models/cart-item';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

describe('ShoppingCartService', () => {
    let service: ShoppingCartService;
    let cartSubject = new BehaviorSubject<ICartItem[]>([]);

    let product: IProduct;
    let item: ICartItem;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ShoppingCartService, { provide: BehaviorSubject, useValue: cartSubject }]
        });
        service = TestBed.inject(ShoppingCartService);
        product = { id: 1, productName: 'Product 1', category: 'Category A', isImported: true, price: 100, quantity: 5 };
        item = { purchasedQuantity: 2, taxe: 1, priceHT: 10, priceTTC: 10.65, product: product };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return cart items as an observable', (done) => {
        const cartItems: ICartItem[] = [item];
        service.clearCart();
        service.addToCart(product, 2);

        service.getCartItems().subscribe((items) => {
            expect(items).toBeTruthy();
            expect(items.length).toEqual(cartItems.length);
            done();
        });
    });

    it('should return cart item by id as an observable', (done) => {
        const productId = 1;
        service.addToCart(product, 1);
        service.getCartItemsById(productId).subscribe((item) => {
            expect(item).toBeTruthy();
            expect(item.product).toEqual(product);
            done();
        });
    });

    it('should add item to cart', () => {
        const quantity = 2;
        service.addToCart(product, quantity);
        expect(service['cartItems'].length).toBe(1);
        expect(service['cartItems'][0].product).toEqual(product);
        expect(service['cartItems'][0].purchasedQuantity).toBe(quantity);
    });

    it('should update item quantity if it already exists in cart', () => {
        const initialQuantity = 2;
        const updatedQuantity = 3;
        service.addToCart(product, initialQuantity);
        service.addToCart(product, updatedQuantity);
        expect(service['cartItems'].length).toBe(1);
        expect(service['cartItems'][0].purchasedQuantity).toBe(updatedQuantity);
    });

    it('should remove item from cart', () => {
        const productId = 1;
        service.addToCart(product, 1);
        service.removeFromCart(productId);
        expect(service['cartItems'].length).toBe(0);
    });

    it('should clear cart', () => {
        service.addToCart(product, 1);
        service.clearCart();
        expect(service['cartItems'].length).toBe(0);
    });
});
