import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantityCounterComponent } from './quantity-counter.component';

describe('QuantityCounterComponent', () => {
  let component: QuantityCounterComponent;
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment quantity', () => {
    component.maxValue = 5;
    component.quantity = 3;
    jest.spyOn(component.quantityChange, 'emit');

    component.incrementQuantity();

    expect(component.quantity).toBe(4);
    expect(component.quantityChange.emit).toHaveBeenCalledWith(4);
  });

  it('should not increment quantity if it reaches the max value', () => {
    component.maxValue = 3;
    component.quantity = 3;
    jest.spyOn(component.quantityChange, 'emit');

    component.incrementQuantity();

    expect(component.quantity).toBe(3);
    expect(component.quantityChange.emit).not.toHaveBeenCalled();
  });

  it('should decrement quantity', () => {
    component.quantity = 3;
    jest.spyOn(component.quantityChange, 'emit');

    component.decrementQuantity();

    expect(component.quantity).toBe(2);
    expect(component.quantityChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not decrement quantity if it reaches 1', () => {
    component.quantity = 1;
    jest.spyOn(component.quantityChange, 'emit');

    component.decrementQuantity();

    expect(component.quantity).toBe(1);
    expect(component.quantityChange.emit).not.toHaveBeenCalled();
  });
});
