import { Category } from '../../modules/product/enums/category.enum';
import { IProduct } from '../../modules/product/models/product';
import { getTaxe } from '../utils/shared-functions';
import { PriceTTCPipe } from './priceTTC.pipe';

describe('PriceTTCPipe', () => {
  let pipe: PriceTTCPipe;

  beforeEach(() => {
    pipe = new PriceTTCPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the price including taxes', () => {
    const product: IProduct = {
        id: 1,
        productName: 'Product 1',
        price: 16.38,
        quantity: 3,
        isImported: true,
        category: Category.BOOKS
    };
    expect(pipe.transform(product)).toEqual(18.88);
  });
});
