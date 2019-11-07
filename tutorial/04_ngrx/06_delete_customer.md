# 6 ngrx - Delete customer

## src/app/customers/store/actions/customer.actions.ts

```ts
export const deleteCustomer = createAction(
  '[UI] Delete customer',
  props<{ id: number }>()
);

export const deleteCustomerSuccess = createAction(
  '[API] Delete customer success',
  props<{ id: number }>()
);

export const deleteCustomerFail = createAction(
  '[API] Delete customer fail',
  props<{ err: any }>()
);
```

## src/app/customers/store/reducers/customer.reducer.ts

```ts
on(CustomerActions.deleteCustomerSuccess, (state, { id }) => ({
  ...state,
  customers: [...state.customers.filter(c => c.id !== id)]
})),
```

## src/app/customers/store/effects/customer.effects.ts

```ts
deleteCustomers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CustomerActions.deleteCustomer),
    concatMap(({ id }) => {
      return this.customerService.delete(id).pipe(
        map(() => CustomerActions.deleteCustomerSuccess({ id })),
        catchError(err => of(CustomerActions.deleteCustomerFail(err)))
      );
    })
  )
);
```

## src/app/customers/customer-list/customer-list.component.ts

```ts
deleteCustomer(id: number) {
    this.store.dispatch(deleteCustomer({ id }));
  }
```
