import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuantityCounterComponent } from './components/quantity-counter/quantity-counter.component';
import { PriceTTCPipe } from './pipes/priceTTC.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [QuantityCounterComponent, PriceTTCPipe],
  exports: [QuantityCounterComponent, PriceTTCPipe],
})
export class SharedModule {}
