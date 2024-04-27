import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/product';
import { PriceTTCPipe } from '../../../../shared/pipes/priceTTC.pipe';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct;
  @Output() onAddItem = new EventEmitter<number>();
  quantity: number = 1;

  constructor() {}

  ngOnInit() {}

  addToCart() {
    this.onAddItem.emit(this.quantity);
  }

}
