import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
import {
  loadCustomers,
  loadCustomersSuccess,
  searchCustomer
} from '../store/actions/customer.actions';
import { CustomerState, reducer } from '../store/reducers/customer.reducer';
import { CustomerListComponent } from './customer-list.component';

const customerMockData = require('../../../../server/mocks/customers/customers.json');

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerServiceSpy: any;
  let store: Store<CustomerState>;

  beforeEach(async(() => {
    const spy = { getAll: () => of([]) };

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          customer: reducer
        })
      ],
      declarations: [CustomerListComponent],
      providers: [{ provide: CustomerService, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    customerServiceSpy = TestBed.get(CustomerService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('GIVEN the component is initialized', () => {
    it('should trigger loading all customers after init', () => {
      expect(component).toBeTruthy();

      component.customers$.pipe(take(1)).subscribe(data => {
        expect(data).toEqual([]);
      });

      const expected = loadCustomers();
      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });

    it('should load all customers after init', () => {
      expect(component).toBeTruthy();

      component.customers$
        .pipe(
          skip(1),
          take(1)
        )
        .subscribe(data => {
          expect(data).toEqual(customerMockData);
        });

      store.dispatch(loadCustomersSuccess({ customers: customerMockData }));
    });

    it('should should load new customers when search input changes', fakeAsync(() => {
      expect(component).toBeTruthy();
      expect(component.searchTerm).toBeDefined();

      component.searchTerm.setValue('Simp');
      const expected = searchCustomer({ criteria: 'Simp' });

      tick(500);

      expect(store.dispatch).toHaveBeenCalledWith(expected);
    }));
  });
});
