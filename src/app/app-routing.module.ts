import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from './modules/product/product.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { RouterPaths } from './app-router.model';

const routes: Routes = [
  { path: '', redirectTo: RouterPaths.PRODUCTS, pathMatch: 'full' },
  { path: RouterPaths.PRODUCTS, loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },
  { path: RouterPaths.SHOPPINGCART, loadChildren: () => import('./modules/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), ProductModule, ShoppingCartModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
