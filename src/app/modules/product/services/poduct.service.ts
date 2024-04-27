import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import {
  Observable,
  map,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PoductService {
  mockProduct: IProduct[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('assets/mocks/products.json');
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>('assets/mocks/products.json')
      .pipe(
        map((products) =>
          products.filter(
            (product) =>
              product.category.toUpperCase() == category.toUpperCase()
          )
        )
      );
  }  
}
