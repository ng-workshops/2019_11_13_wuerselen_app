# 0 Testing - Fix existing tests

## src/customers/guards/customer-exists.guard.spec.ts

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [CustomerExistsGuard, { provide: Store, useValue: {} }]
  });
});
```

## src/app/customers/customer/customer.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [CustomerComponent, CustomerStatusPipe],
    providers: [{ provide: Router, useValue: {} }],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();
}));
```

## src/app/customers/store/effects/customer.effects.spec.ts

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      CustomerEffects,
      { provide: HttpClient, useValue: {} },
      { provide: MatSnackBar, useValue: {} },
      { provide: ModalService, useValue: {} },
      provideMockActions(() => actions$)
    ]
  });

  effects = TestBed.get(CustomerEffects);
});
```

## src/app/customers/customer-list/customer-list.component.spec.ts

```ts
beforeEach(async(() => {
  // const spy = jasmine.createSpyObj('CustomerService', ['getAll']);
  const spy = { getAll: () => of([]) };
  let store: Store<CustomerState>;

  TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({
        customer: reducer
      })
    ],
    declarations: [CustomerListComponent],
    providers: [
      { provide: Router, useValue: {} },
      { provide: CustomerService, useValue: spy }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();

  customerServiceSpy = TestBed.get(CustomerService);
  store = TestBed.get(Store);
  spyOn(store, 'dispatch').and.callThrough();
}));
```

## src/app/customers/customer-form/customer-form.component.spec.ts

```ts
beforeEach(async(() => {
  const activeRouteDataListener = new Subject();
  const activeRouteParamMapListener = new Subject();
  const activeRouteStub = {
    data: activeRouteDataListener,
    paramMap: activeRouteParamMapListener,
    snapshot: {
      params: {
        id: '10'
      }
    }
  };
  let store: Store<CustomerState>;

  TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({
        customer: reducer
      })
    ],
    declarations: [CustomerFormComponent],
    providers: [
      { provide: ActivatedRoute, useValue: activeRouteStub },
      { provide: Router, useValue: {} },
      { provide: CustomerService, useValue: {} },
      { provide: MatSnackBar, useValue: {} }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();

  store = TestBed.get(Store);
  spyOn(store, 'dispatch').and.callThrough();
}));
```
