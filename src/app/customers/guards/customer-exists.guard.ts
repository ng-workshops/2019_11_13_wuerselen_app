import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { loadCustomers } from '../store/actions/customer.actions';
import { CustomerState } from '../store/reducers/customer.reducer';
import {
  getCustomersEntities,
  getLoaded
} from '../store/selectors/customer.selectors';

@Injectable({
  providedIn: 'root'
})
export class CustomerExistsGuard implements CanActivate {
  constructor(private store: Store<CustomerState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(next.params.id, 10);
        return this.hasCustomer(id);
      })
    );
  }

  hasCustomer(id: number): Observable<boolean> {
    return this.store.pipe(
      select(getCustomersEntities),
      map(customers => Boolean(customers[id])),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(loadCustomers());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
