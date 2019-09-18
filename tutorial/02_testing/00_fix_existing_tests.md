# 0 Testing - Fix existing tests

## src/customers/guards/customer-exists.guard.spec.ts

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [CustomerExistsGuard, { provide: Store, useValue: {} }]
  });
});
```

## src/app/home/info-box/info-box.component.spec.ts

```ts
const listenerSubject = new Subject();
const messageServiceMock = {
  listener$: listenerSubject.asObservable()
};

beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [InfoBoxComponent],
    providers: [
      {
        provide: MessageService,
        useValue: messageServiceMock
      }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();
}));
```

## src/app/home/info-item/info-item.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [FormsModule],
    declarations: [InfoItemComponent]
  }).compileComponents();
}));
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

## src/app.component.ts

```ts
providers: [
SettingsService,
{ provide: HttpClient, useValue: {} },
HostElementService
],
```

## shared/modal/modal.service.spec.ts

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [ModalService, HostElementService]
  });
});
```

## shared/modal/modal.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [MatCardModule, MatButtonModule, NoopAnimationsModule],
    declarations: [ModalComponent]
  }).compileComponents();
}));

beforeEach(() => {
  fixture = TestBed.createComponent(ModalComponent);
  component = fixture.componentInstance;
  component.modal = { title: 'test', message: 'tester', type: 'primary' };
  fixture.detectChanges();
});
```

## src/app/home/home.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [FormsModule, MatCardModule],
    declarations: [HomeComponent, InfoBoxComponent, InfoItemComponent],
    providers: [MessageService, HostElementService, ModalService]
  }).compileComponents();
}));
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
