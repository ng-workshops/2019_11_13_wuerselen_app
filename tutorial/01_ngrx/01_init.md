# 1 ngrx - Init stores

https://ngrx.io/guide/schematics

> ng generate store State --root --statePath store --stateInterface AppState --module app.module.ts

## src/app/store/index.ts

```ts
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

// tslint:disable-next-line:no-empty-interface
export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
```

> ng generate feature customers/store/Customer --module customers/customers.module.ts --group --creators

## src/app/customers/store/reducers/customer.reducer.ts

```ts
import { Action } from '@ngrx/store';
import { Customer } from '../../customer.model';
import * as CustomerActions from '../actions/customer.actions';

export interface CustomerState {
  loading: boolean;
  customers: Customer[];
  selectedCustomerId?: number;
  search?: string;
}

export const initialState: CustomerState = {
  loading: false,
  customers: []
};

const customerReducer = createReducer(
  initialState,

  on(CustomerActions.loadCustomers, state => ({ ...state, loading: true }))
);

export function reducer(state: CustomerState | undefined, action: Action) {
  return customerReducer(state, action);
}
```

> touch customers/store/selectors/customer.selectors.ts

## src/app/customers/store/selectors/customer.selectors.ts

```ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from '../reducers/customer.reducer';
/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getCustomersStore = createFeatureSelector<CustomerState>(
  'customer'
);

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state.
 */
export const getLoading = createSelector(
  getCustomersStore,
  store => store.loading
);

export const getCustomers = createSelector(
  getCustomersStore,
  store => store.customers
);
```

## src/app/app.module.ts

```ts
EffectsModule.forRoot([]),
```

## src/app/customers/store/effects/customer.effects.ts

```ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as CustomerActions from '../actions/customer.actions';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffects {
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    )
  );

  constructor(private actions$: Actions) {}
}
```

## src/app/customers/customer-list/customer-list.component.ts

```ts
constructor(
    private router: Router,
    private customerService: CustomerService,
    private store: Store<CustomerState>
  ) { }

ngOnInit() {
    this.store.dispatch(loadCustomers());
  }
```
