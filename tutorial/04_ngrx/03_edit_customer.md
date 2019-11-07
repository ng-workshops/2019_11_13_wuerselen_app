# 3 ngrx - Edit customer

## src/app/customers/store/actions/customer.actions.ts

```ts
export const selectCustomer = createAction(
  '[UI] Select customer',
  props<{ id: number }>()
);
```

## src/app/customers/store/reducers/customer.reducer.ts

```ts
on(CustomerActions.selectCustomer, (state, { id }) => ({
  ...state,
  selectedCustomerId: id
})),
```

## src/app/customers/store/selectors/customer.selectors.ts

```ts
export const getSelectedCustomerId = createSelector(
  getCustomersStore,
  store => store.selectedCustomerId
);

export const getSelectedCustomer = createSelector(
  getCustomers,
  getSelectedCustomerId,
  (customers, selectedCustomerId) =>
    customers.find(c => c.id === selectedCustomerId)
);
```

## src/app/customers/customer-form/customer-form.component.ts

```ts
import { select, Store } from '@ngrx/store';

export class CustomerFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private store: Store<CustomerState>
  ) {}

  ngOnInit() {
    this.form = Customer.toFormGroup();

    this.store
      .pipe(
        select(getSelectedCustomer),
        filter(customer => Boolean(customer)),
        takeUntil(this.destroy$)
      )
      .subscribe(customer => {
        this.form.patchValue(customer);
      });

    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        filter(id => id !== 'new')
      )
      .subscribe(id => {
        this.store.dispatch(selectCustomer({ id: parseInt(id, 10) }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
```
