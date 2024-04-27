import { Category } from '../../modules/product/enums/category.enum';
import { IProduct } from '../../modules/product/models/product';

export function getTaxe(product: IProduct): number {
  const priceHT = product.price;
  let taxe = 0;
  switch (product.category) {
    case Category.BOOKS:
      // 10% taxe on books
      taxe = roundUpToNearestFiveCents((priceHT * 10) / 100);
      break;
    case Category.PARFUM:
    case Category.ELECTRIC:
      // 20% taxe on parfums and electric
      taxe = roundUpToNearestFiveCents((priceHT * 20) / 100);
      break;
    default:
      break;
  }
  if (product.isImported) {
    // 5% additional taxe on imported product
    taxe += roundUpToNearestFiveCents((priceHT * 5) / 100);
  }
  return taxe;
}

export function roundUpToNearestFiveCents(taxe: number): number {
  return Math.ceil(taxe / 0.05) * 0.05;
}
