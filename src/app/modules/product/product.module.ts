import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductRoutingModule } from './product-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, ProductRoutingModule, HttpClientModule, SharedModule],
  declarations: [ProductComponent, ProductCardComponent],
  exports: [ProductComponent]
})
export class ProductModule {}
