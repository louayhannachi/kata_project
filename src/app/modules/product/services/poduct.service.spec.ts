import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProduct } from '../models/product';
import { PoductService } from './poduct.service';

describe('PoductService', () => {
  let service: PoductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PoductService]
    });
    service = TestBed.inject(PoductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products', () => {
    const mockProducts: IProduct[] = [
        { id: 1, productName: 'Product 1', category: 'Category A', isImported: true, price: 100, quantity: 5 },
        { id: 3, productName: 'Product 3', category: 'Category A', isImported: true, price: 200, quantity: 12 }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('assets/mocks/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should retrieve products by category', () => {
    const category = 'Category A';
    const mockProducts: IProduct[] = [
      { id: 1, productName: 'Product 1', category: 'Category A', isImported: true, price: 100, quantity: 5 },
      { id: 2, productName: 'Product 2', category: 'Category A', isImported: true, price: 200, quantity: 12 },
      { id: 3, productName: 'Product 3', category: 'Category B', isImported: true, price: 300, quantity: 17 }

    ];

    service.getProductsByCategory(category).subscribe((products: IProduct[]) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('assets/mocks/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
