import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { PriceTTCPipe } from '../../../../shared/pipes/priceTTC.pipe';
import { Category } from '../../enums/category.enum';

describe('ProductCardComponent', () => {
    let component: ProductCardComponent;
    let fixture: ComponentFixture<ProductCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductCardComponent, PriceTTCPipe]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.componentInstance;
        component.product = {
            id: 1,
            productName: 'Mock Product',
            price: 100,
            quantity: 10,
            category: Category.BOOKS,
            isImported: true
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit onAddItem event with quantity when addToCart is called', () => {
        const quantity = 2;
        component.quantity = quantity;
        const emittedQuantity = jest.fn();
        component.onAddItem.subscribe((value: number) => {
            emittedQuantity(value);
        });

        component.addToCart();

        expect(emittedQuantity).toHaveBeenCalledWith(quantity);
    });
});