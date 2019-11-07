# 3 testing - selectors

> touch src/app/customers/store/selectors/customer.selectors.spec.ts

## src/app/customers/store/selectors/customer.selectors.spec.ts

```ts
import { Customer } from '../../customer.model';
import { initialState } from '../reducers/customer.reducer';
import * as fromSelectors from './customer.selectors';

describe('Customer Selectors', () => {
  const customerMockData: Customer[] = require('../../../../../server/mocks/customers/customers.json');

  describe('getLoading', () => {
    it('should return the loading state from the store', () => {
      const actual = fromSelectors.getLoading({ customer: initialState });

      expect(actual).toBeFalsy();
    });
  });

  describe('getCustomers', () => {
    it('should return the customers from the store', () => {
      const entities = {};
      customerMockData.forEach(c => {
        entities[c.id] = c;
      });

      const state = {
        customer: {
          ...initialState,
          ids: customerMockData.map(c => c.id),
          entities
        }
      };
      const actual = fromSelectors.getCustomers(state);

      expect(actual).toEqual(customerMockData);
    });
  });

  describe('getSelectedCustomer', () => {
    it('should return the customers from the store', () => {
      const entities = {};
      customerMockData.forEach(c => {
        entities[c.id] = c;
      });

      const state = {
        customer: {
          ...initialState,
          ids: customerMockData.map(c => c.id),
          selectedCustomerId: customerMockData[1].id,
          entities
        }
      };

      const actual = fromSelectors.getSelectedCustomer(state);

      expect(actual).toEqual(customerMockData[1]);
    });
  });
});
```
