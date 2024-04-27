import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductComponent } from './product.component';
import { PoductService } from './services/poduct.service';
import { ShoppingCartService } from '../shopping-cart/services/shopping-cart.service';
import { IProduct } from './models/product';
import { Router } from '@angular/router';
import { RouterPaths } from '../../app-router.model';
import { of } from 'rxjs';
import { ICartItem } from '../shopping-cart/models/cart-item';

describe('ProductComponent', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;
    let productService: PoductService;
    let shoppingCartService: ShoppingCartService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: PoductService, useValue: { getProducts: jest.fn(), getProductsByCategory: jest.fn() } },
                { provide: ShoppingCartService, useValue: { getCartItems: jest.fn(), addToCart: jest.fn() } }
            ]
        }).compileComponents();

        productService = TestBed.inject(PoductService);
        shoppingCartService = TestBed.inject(ShoppingCartService);
        router = TestBed.inject(Router);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call productService.getProducts on constructor', () => {
        const mockProducts: IProduct[] = [
            { id: 1, productName: 'Product 1', category: 'Category A', isImported: true, price: 100, quantity: 5 },
            { id: 3, productName: 'Product 3', category: 'Category A', isImported: true, price: 200, quantity: 12 }
        ];
        const getProductsSpy = jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

        component = new ProductComponent(router, productService, shoppingCartService);

        expect(getProductsSpy).toHaveBeenCalled();
        expect(component.products$).toBeDefined();
    });

    it('should call shoppingCartService.getCartItems() on constructor', () => {
        const mockCarts: ICartItem[] = [
            { purchasedQuantity: 2, taxe: 1, priceHT: 10, priceTTC: 10.65, product: { id: 1, productName: 'Product 1', category: 'Category A', isImported: true, price: 100, quantity: 5 } },
        ];
        const getCartItemsSpy = jest.spyOn(shoppingCartService, 'getCartItems').mockReturnValue(of(mockCarts));

        component = new ProductComponent(router, productService, shoppingCartService);

        expect(getCartItemsSpy).toHaveBeenCalled();
        expect(component.purchasedItem$).toBeDefined();
    });

    it('should call productService.getProductsByCategory when onCategoryChanged is called', () => {
        const category = 'Category A';
        const mockProducts: IProduct[] = [
            { id: 1, productName: 'Product 1', category: 'Category A', isImported: true, price: 100, quantity: 5 },
            { id: 3, productName: 'Product 3', category: 'Category A', isImported: true, price: 200, quantity: 12 }
        ];
        const getProductsByCategorySpy = jest.spyOn(productService, 'getProductsByCategory').mockReturnValue(of(mockProducts));

        component.onCategoryChanged(category);

        expect(getProductsByCategorySpy).toHaveBeenCalledWith(category);
        expect(component.products$).toBeDefined();
    });

    it('should call shoppingCartService.addToCart when addItemToCart is called', () => {
        const mockProduct: IProduct = { id: 1, productName: 'Product 1', category: 'Category A', isImported: true, price: 100, quantity: 5 };
        const quantity = 2;
        const addToCartSpy = jest.spyOn(shoppingCartService, 'addToCart');

        component.addItemToCart(mockProduct, quantity);

        expect(addToCartSpy).toHaveBeenCalledWith(mockProduct, quantity);
    });

    it('should reset filter and display all categories when resetFilter is called', () => {
        let selectElement = document.createElement('select');
        let optionElement = document.createElement('option');
        optionElement.value = 'All'; // Assuming the first option represents resetting the filter
        selectElement.appendChild(optionElement);
        selectElement.selectedIndex = 2;
        const mockProducts: IProduct[] = [{ id: 1, productName: 'Product 1', category: 'Category A', isImported: true, price: 100, quantity: 5 }];
        const getProductsSpy = jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

        component.resetFilter(selectElement);

        expect(selectElement.selectedIndex).toBe(0);
        expect(getProductsSpy).toHaveBeenCalled();
        expect(component.products$).toBeDefined();
    });

    it('should redirect to cart page when redirectToCart is called', () => {
        const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');

        component.redirectToCart();

        expect(navigateByUrlSpy).toHaveBeenCalledWith(RouterPaths.SHOPPINGCART);
    });
});
