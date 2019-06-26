# 4 testing - effects

## src/app/customers/store/effects/customer.effects.spec.ts

```ts
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject } from 'rxjs';
import { ModalService } from '../../../shared/modal/modal.service';
import { CustomerService } from '../../customer.service';
import {
  loadCustomers,
  loadCustomersSuccess,
  searchCustomer
} from '../actions/customer.actions';
import { CustomerEffects } from './customer.effects';

const customerMockData = require('../../../../../server/mocks/customers/customers.json');

const CustomerServiceStub = {
  getAll: () => of(customerMockData)
};

describe('CustomerEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: CustomerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerEffects,
        {
          provide: CustomerService,
          useValue: CustomerServiceStub
        },
        { provide: MatSnackBar, useValue: {} },
        { provide: ModalService, useValue: {} },
        provideMockActions(() => actions$)
      ]
    });

    spyOn(CustomerServiceStub, 'getAll').and.callThrough();

    effects = TestBed.get(CustomerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('GIVEN the customers are loaded', () => {
    describe('WHEN there is no search value', () => {
      it('THEN the LoadCustomersSuccess action should be returned with customers', done => {
        actions$ = new ReplaySubject(1);
        actions$.next(loadCustomers());

        effects.loadCustomers$.subscribe(result => {
          expect(result).toEqual(
            loadCustomersSuccess({ customers: customerMockData })
          );
          expect(CustomerServiceStub.getAll).toHaveBeenCalledWith(undefined);
          done();
        });
      });
    });
  });

  describe('WHEN there is a search value', () => {
    it('THEN the LoadCustomersSuccess action should be returned with customers', done => {
      actions$ = new ReplaySubject(1);
      actions$.next(searchCustomer({ criteria: 'simpson' }));

      effects.loadCustomers$.subscribe(result => {
        expect(result).toEqual(
          loadCustomersSuccess({ customers: customerMockData })
        );
        expect(CustomerServiceStub.getAll).toHaveBeenCalledWith('simpson');
        done();
      });
    });
  });
});
```
