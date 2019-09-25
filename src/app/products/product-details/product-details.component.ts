import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  // product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => (this.product = data.product));

    // this.product$ = this.route.data.pipe(
    //   pluck('product')
    // );
  }

  save() {
    this.productsService.update(this.product).subscribe(() => this.cancel());
  }

  cancel() {
    const id = this.product ? this.product.id : '';
    this.router.navigate(['/products', { id }]);
  }

  canDeactivate(): Observable<boolean> | boolean {
    return of(true);
    // return of(window.confirm('Go away?'));
  }
}
