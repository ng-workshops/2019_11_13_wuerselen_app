# 2 ngrx - All customers

## src/app/customers/store/actions/customer.actions.ts

```ts
import { createAction, props } from '@ngrx/store';
import { Customer } from '../../customer.model';

export const loadCustomers = createAction('[Customer] Load Customers');

export const loadCustomersSuccess = createAction(
  '[API] Load Customers Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFail = createAction(
  '[API] Load Customers Fail',
  props<{ err: any }>()
);
```

## src/app/customers/store/reducers/customer.reducer.ts

```ts
const customerReducer = createReducer(
  initialState,

  on(
    CustomerActions.loadCustomers,
    CustomerActions.loadCustomersFail,
    state => ({ ...state, loading: true })
  ),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    loading: false,
    selectedCustomerId: null,
    customers
  }))
);
```

## src/app/customers/store/effects/customer.effects.ts

```ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CustomerService } from '../../customer.service';
import * as CustomerActions from '../actions/customer.actions';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffects {
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      switchMap(() => {
        return this.customerService.getAll().pipe(
          map(customers => CustomerActions.loadCustomersSuccess({ customers })),
          catchError(err => of(CustomerActions.loadCustomersFail(err)))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}
}
```

## src/app/customers/customer-list/customer-list.component.ts

```ts
import {
  getCustomers,
  getLoading
} from '../store/selectors/customer.selectors';

export class CustomerListComponent implements OnInit {
  // set up selectors
  customers$: Observable<Customer[]> = this.store.select(getCustomers);
  loading$: Observable<boolean> = this.store.select(getLoading);

  ngOnInit() {
    this.store.dispatch(loadCustomers());

    // this.customers$ = merge(this.search$, this.reload$).pipe(
    //   withLatestFrom(this.search$),
    //   map(value => value[1]),
    //   switchMap(value => {
    //     return this.customerService.getAll(value);
    //   })
    // );
  }
}
```

## src/app/customers/customer-list/customer-list.component.html

```html
<mat-progress-bar
  *ngIf="loading$ | async"
  color="primary"
  mode="indeterminate"
></mat-progress-bar>

...
```

## src/app/shared/shared.moddule.ts

```ts
import { MatProgressBarModule } from '@angular/material/progress-bar';

....

exports: [
  ...
  MatProgressBarModule,
  ...
]

```
