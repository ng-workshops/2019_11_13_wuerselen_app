# 4 ngrx - Add customer

## src/app/customers/store/actions/customer.actions.ts

```ts
export const addCustomer = createAction(
  '[UI] Add new customer',
  props<{ customer: Customer }>()
);

export const addCustomerSuccess = createAction(
  '[API] Add new customer success',
  props<{ customer: Customer }>()
);

export const addCustomerFail = createAction(
  '[API] Add new customer fail',
  props<{ err: any }>()
);
```

## src/app/customers/store/reducers/customer.reducer.ts

```ts
on(CustomerActions.addCustomerSuccess, (state, { customer }) => ({
  ...state,
  customers: [...state.customers, customer]
})),
```

## src/app/customers/store/effects/customer.effects.ts

```ts
  addCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      concatMap(({ customer }) => {
        return this.customerService.create(customer).pipe(
          map(result => CustomerActions.addCustomerSuccess({ customer: result })),
          catchError(err => of(CustomerActions.addCustomerFail({err})))
        );
      })
    )
  );

  saveCustomersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CustomerActions.addCustomerSuccess),
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

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
```

## src/app/customers/customer-form/customer-form.component.ts

```ts
 submit() {
    const data = this.form.getRawValue();
    this.store.dispatch(addCustomer({customer:data}));
  }
```
