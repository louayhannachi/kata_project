import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-counter',
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class QuantityCounterComponent implements OnInit {

  @Input() maxValue: number;
  @Output() quantityChange = new EventEmitter<number>();
  quantity: number = 1;

  constructor() {}

  ngOnInit() {}

  incrementQuantity() {
    if (this.quantity < this.maxValue) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}
