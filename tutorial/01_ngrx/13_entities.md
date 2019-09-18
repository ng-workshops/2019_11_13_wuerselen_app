# 13 ngrx - using entities instead of arrays

## src/app/customers/store/reducers/customer.reducer.ts

```ts
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface CustomerState extends EntityState<Customer> {
  // additional entity state properties
  loading: boolean;
  selectedCustomerId?: number;
  search?: string;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState: CustomerState = adapter.getInitialState({
  // additional entity state properties
  loading: false
});

on(
    CustomerActions.loadCustomersSuccess,
    (state, { customers }) =>
      adapter.addAll(customers, {
        ...state,
        loading: false,
        selectedCustomerId: null
      })
  ),

  on(
    CustomerActions.addCustomerSuccess,
    (state, { customer }) => adapter.addOne(customer, state)
  ),

  on(
    CustomerActions.updateCustomerSuccess,
    (state, { customer }) => adapter.updateOne(customer, state)
  ),

  on(
    CustomerActions.deleteCustomerSuccess,
    (state, { id }) => adapter.removeOne(id, state)
  ),

  // get the selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
```

## src/app/customers/store/actions/customer.actions.ts

```ts
import { Update } from '@ngrx/entity';

export const updateCustomerSuccess = createAction(
  '[API] Update customer success',
  props<{ customer: Update<Customer> }>()
);
```

## src/app/customers/store/selectors/customer.selector.ts

```ts
import {
  CustomerState,
  selectAll,
  selectEntities
} from '../reducers/customer.reducer';

// export const getCustomers = createSelector(
//   getCustomersStore,
//   store => store.customers
// );

export const getCustomers = createSelector(
  getCustomersStore,
  selectAll
);

export const getCustomersEntities = createSelector(
  getCustomersStore,
  selectEntities
);

// export const getSelectedCustomerFromRouter = createSelector(
//   getCustomers,
//   getRouterState,
//   (customers, router) =>
//     customers.find(c => c.id.toString() === router.state.params.id) || {}
// );

export const getSelectedCustomerFromRouter = createSelector(
  getCustomersEntities,
  getRouterState,
  (entities, router) => entities[router.state.params.id]
);
```

## src/app/customers/store/effects/customer.effects.ts

```ts
updateCustomers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CustomerActions.updateCustomer),
    concatMap(({ customer }) => {
      return this.customerService.update(customer).pipe(
        map(result =>
          CustomerActions.updateCustomerSuccess({
            customer: { id: customer.id, changes: result }
          })
        ),
        catchError(err => of(CustomerActions.updateCustomerFail(err)))
      );
    })
  )
);

saveCustomersSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      CustomerActions.addCustomerSuccess,
      CustomerActions.updateCustomerSuccess
    ),
    tap(({ customer }: any) => {
      this.snackBar.open(
        `Customer ${customer.name ||
          customer.changes.name} saved successfully.`,
        '',
        {
          duration: 2000
        }
      );
    }),
    map(() => navigate({ path: ['customers'] }))
  )
);
```
