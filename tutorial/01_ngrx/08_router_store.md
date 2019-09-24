324# 8 ngrx - Router Store

## src/app/store/index.ts

```ts
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterEffects } from '../core/router/router.effects';
import { RouterStateUrl } from '../core/router/router.serializer';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>; // default from ngrx
}

export const reducers: ActionReducerMap<AppState> = { router: routerReducer }; // default from ngrx;

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('router');

export const effects: any[] = [RouterEffects];
```

## src/app.module.ts

```ts
imports: [
  // Connects RouterModule with StoreModule
  StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
  })
  EffectsModule.forRoot(effects),
]
```

## src/app/customers/store/effects/customer.effects.ts

```ts
saveCustomersSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      CustomerActions.addCustomerSuccess,
      CustomerActions.updateCustomerSuccess
    ),
    tap(({ customer }) => {
      this.snackBar.open(`Customer ${customer.name} saved successfully.`, '', {
        duration: 2000
      });
    }),
    map(() => navigate({ path: ['customers'] }))
  )
);
```

## src/app/customers/customer-list/customer-list.component.ts

```ts
addNewCustomer() {
  this.store.dispatch(navigate({ path: ['customers', 'new'] }));
}
```

<!-- Possible optimization to use the router store -->

## src/app/customers/store/selectors/customer.selectors.ts

```ts
export const getSelectedCustomerFromRouter = createSelector(
  getCustomers,
  getRouterState,
  (customers, router) =>
    customers.find(c => c.id.toString() === router.state.params.id) || {}
);
```

## src/app/customers/customer-form/customer-form.component.ts

```ts
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  ngOnInit() {
    this.form = Customer.toFormGroup();

    this.store
      // .select(getSelectedCustomer)
      .select(getSelectedCustomerFromRouter)
      .pipe(
        filter(customer => !!customer),
        takeUntil(this.destroy$)
      )
      .subscribe(customer => {
        this.form.patchValue(customer);
      });

    // this.route.paramMap
    //   .pipe(
    //     map(params => params.get('id')),
    //     filter(id => id !== 'new')
    //   )
    //   .subscribe(id => {
    //     this.store.dispatch(selectCustomer({ id: parseInt(id, 10) }));
    //   });
  }

  cancel() {
    // this.router.navigate(['customers']);
    this.store.dispatch(navigate({ path: ['customers'] }));
  }
}
```
