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

## src/app/shared/modal/modal.component.spec.ts

```ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## src/app/home/info-box/info-box.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [InfoBoxComponent],
    providers: [MessageService],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();
}));
```

## src/app/home/info-item/info-item.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [InfoItemComponent],
    imports: [FormsModule]
  }).compileComponents();
}));
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

## src/app/app.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [NoopAnimationsModule],
    declarations: [AppComponent],
    providers: [
      SettingsService,
      HostElementService,
      { provide: HttpClient, useValue: {} },
      {
        provide: TranslateService,
        useValue: {
          setDefaultLang: () => {},
          use: () => {}
        }
      }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();
}));
```

## src/app/shared/directives/can-click.directive.spec.ts

```ts
import { CanClickDirective } from './can-click.directive';

const elementStub: any = {};
const rendererStub: any = {};

describe('CanClickDirective', () => {
  it('should create an instance', () => {
    const directive = new CanClickDirective(elementStub, rendererStub);
    expect(directive).toBeTruthy();
  });
});
```
