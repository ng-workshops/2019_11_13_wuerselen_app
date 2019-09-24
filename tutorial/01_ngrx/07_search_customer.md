# 7 ngrx - Search customer

## src/app/customers/store/actions/customer.actions.ts

```ts
export const searchCustomer = createAction(
  '[UI] Search for customer',
  props<{ criteria: string }>()
);
```

## src/app/customers/store/reducers/customer.reducer.ts

```ts
on(CustomerActions.searchCustomer, (state, { criteria }) => ({
  ...state,
  loading: true,
  search: criteria
})),
```

## src/app/customers/store/effects/customer.effects.ts

```ts
loadCustomers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CustomerActions.loadCustomers, CustomerActions.searchCustomer),
    switchMap((action: any) => {
      return this.customerService.getAll(action.criteria).pipe(
        map(customers => CustomerActions.loadCustomersSuccess({ customers })),
        catchError(err => of(CustomerActions.loadCustomersFail(err)))
      );
    })
  )
);
```

## src/app/customers/customer-list/customer-list.component.ts

```ts
export class CustomerListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm =>
        this.store.dispatch(searchCustomer({ criteria: searchTerm }))
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
```
