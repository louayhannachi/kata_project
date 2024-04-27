import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../modules/product/models/product';
import { getTaxe } from '../utils/shared-functions';

@Pipe({
  name: 'priceTTC'
})
export class PriceTTCPipe implements PipeTransform {

  transform(product: IProduct, args?: any): any {
    return product.price + getTaxe(product);
  }

}
