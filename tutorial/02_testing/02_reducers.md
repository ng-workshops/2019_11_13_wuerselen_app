# 2 testing - reducers

## src/app/customers/store/reducers/customer.reducer.spec.ts

```ts
import { Customer } from '../../customer.model';
import * as fromActions from '../actions/customer.actions';
import { initialState, reducer } from './customer.reducer';

const customerMockData: Customer[] = require('../../../../../server/mocks/customers/customers.json');

describe('Customer Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('LOAD_CUSTOMERS action', () => {
    it('should set loading to true', () => {
      const action = fromActions.loadCustomers();
      const state = reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.entities).toEqual({});
      expect(state.ids).toEqual([]);
    });
  });

  describe('SELECT_CUSTOMER action', () => {
    it('should set the selectedCustomerId in the store', () => {
      const id = customerMockData[0].id;
      const action = fromActions.selectCustomer({ id });
      const state = reducer(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.selectedCustomerId).toEqual(id);
    });
  });

  describe('DELETE_CUSTOMER_SUCCESS action', () => {
    it('should remove the customer from the store', () => {
      const entities = {};
      customerMockData.forEach(c => {
        entities[c.id] = c;
      });

      const previousState = {
        ...initialState,
        ids: customerMockData.map(c => c.id),
        entities
      };
      const id = customerMockData[1].id;
      const action = fromActions.deleteCustomerSuccess({ id });
      const state = reducer(previousState, action);

      expect(state.loading).toEqual(false);
      expect(state.ids.length).toEqual(2);
      expect(state.entities).toEqual({
        '1': customerMockData[0],
        '3': customerMockData[2]
      });
    });
  });
});
```
