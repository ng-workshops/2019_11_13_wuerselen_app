# 5 ngrx - Update customer

## src/app/customers/store/actions/customer.actions.ts

```ts
export const updateCustomer = createAction(
  '[UI] Update customer',
  props<{ customer: Customer }>()
);

export const updateCustomerSuccess = createAction(
  '[API] Update customer success',
  props<{ customer: Customer }>()
);

export const updateCustomerFail = createAction(
  '[API] Update customer fail',
  props<{ err: any }>()
);
```

## src/app/customers/store/reducers/customer.reducer.ts

```ts
on(CustomerActions.updateCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: state.customers.map(c =>
      c.id === customer.id ? { ...customer } : c
    )
  })),
```

## src/app/customers/store/effects/customer.effects.ts

```ts
updateCustomers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CustomerActions.updateCustomer),
    concatMap(({ customer }) => {
      return this.customerService.update(customer).pipe(
        map(result =>
          CustomerActions.updateCustomerSuccess({ customer: result })
        ),
        catchError(err => of(CustomerActions.updateCustomerFail(err)))
      );
    })
  )
);

saveCustomersSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(
        CustomerActions.addCustomerSuccess,
        CustomerActions.updateCustomer
      ),
      tap(({ customer }) => {
        this.snackBar.open(
          `Customer ${customer.name} saved successfully.`,
          '',
          {
            duration: 2000
          }
        );
      }),
      map(() => this.router.navigateByUrl('/customers'))
    ),
  { dispatch: false }
);
```

## src/app/customers/customer-form/customer-form.component.ts

```ts
 submit() {
    const data = this.form.getRawValue();
    this.store.dispatch(
      data.id
        ? updateCustomer({ customer: data })
        : addCustomer({ customer: data })
    );
  }
```
