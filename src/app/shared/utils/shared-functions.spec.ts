import { IProduct } from '../../modules/product/models/product';
import { Category } from '../../modules/product/enums/category.enum';
import { getTaxe, roundUpToNearestFiveCents } from './shared-functions';

describe('getTaxe', () => {
  it('should calculate taxe correctly for books', () => {
    const product: IProduct = {
        id: 1,
        productName: 'Product 1',
        price: 16.38,
        quantity: 3,
        isImported: true,
        category: Category.BOOKS
    };
    expect(getTaxe(product)).toEqual(2.5); 
  });

  it('should calculate taxe correctly for parfums', () => {
    const product: IProduct = {
        id: 2,
        productName: 'Parfum',
        price: 73.58,
        category: Category.PARFUM,
        isImported: false,
        quantity: 1
    };
    expect(getTaxe(product)).toEqual(14.75); 
  });

  it('should calculate taxe correctly for electric items', () => {
    const product: IProduct = {
        id: 3,
        productName: 'Electric Item',
        price: 9.18,
        category: Category.ELECTRIC,
        isImported: true,
        quantity: 5
    };
    expect(getTaxe(product)).toEqual(2.35); 
  });

  it('should round taxe up to nearest 0.05', () => {
    expect(roundUpToNearestFiveCents(0.99)).toEqual(1);
    expect(roundUpToNearestFiveCents(1)).toEqual(1);
    expect(roundUpToNearestFiveCents(1.01)).toEqual(1.05);
    expect(roundUpToNearestFiveCents(1.07)).toEqual(1.1);
  });
});
