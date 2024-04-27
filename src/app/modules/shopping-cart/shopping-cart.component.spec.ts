import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import { Router } from '@angular/router';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ICartItem } from './models/cart-item';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterPaths } from '../../app-router.model';

describe('ShoppingCartComponent', () => {
    let component: ShoppingCartComponent;
    let fixture: ComponentFixture<ShoppingCartComponent>;
    let router: Router;
    let shoppingCartService: ShoppingCartService;
    let mockCartItems: ICartItem[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShoppingCartComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: ShoppingCartService, useValue: { getCartItems: jest.fn(), addToCart: jest.fn() } }
            ]
        }).compileComponents();
    
        router = TestBed.inject(Router);
        shoppingCartService = TestBed.inject(ShoppingCartService);
        mockCartItems = [
            { purchasedQuantity: 2, taxe: 1, priceHT: 10, priceTTC: 10.65, product: { id: 1, productName: 'Product 1', category: 'Category A', isImported: true, price: 100, quantity: 5 } },
            { purchasedQuantity: 4, taxe: 3, priceHT: 20, priceTTC: 20.75, product: { id: 2, productName: 'Product 2', category: 'Category A', isImported: true, price: 100, quantity: 5 } },
            { purchasedQuantity: 5, taxe: 5, priceHT: 30, priceTTC: 30.85, product: { id: 3, productName: 'Product 3', category: 'Category A', isImported: true, price: 100, quantity: 5 } }
        ]
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingCartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate total price excluding taxes correctly', () => {
        const totalPriceHT = component.getTotalPriceHT(mockCartItems);
        expect(totalPriceHT).toEqual(250);
    });

    it('should calculate total taxes correctly', () => {
        const totalTaxes = component.getTotalTaxes(mockCartItems);
        expect(totalTaxes).toEqual(39);
    });

    it('should calculate total price including taxes correctly', () => {
        const totalPriceTTC = component.getTotalPriceTTC(mockCartItems);
        expect(totalPriceTTC).toEqual(258.55);
    });

    it('should redirect to products', () => {
        const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');
        component.redirectToProducts();
        expect(navigateByUrlSpy).toHaveBeenCalledWith(RouterPaths.PRODUCTS);
    });
});
