import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from '../../customer.model';
import * as CustomerActions from '../actions/customer.actions';

export const customerFeatureKey = 'customer';

export interface CustomerState extends EntityState<Customer> {
  // additional entity state properties
  loading: boolean;
  loaded: boolean;
  selectedCustomerId?: number;
  search?: string;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState: CustomerState = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false
});

const customerReducer = createReducer(
  initialState,

  on(
    CustomerActions.loadCustomers,
    CustomerActions.loadCustomersFail,
    state => ({ ...state, loading: true, loaded: false })
  ),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) =>
    adapter.addAll(customers, {
      ...state,
      loading: false,
      loaded: true,
      selectedCustomerId: null
    })
  ),
  on(CustomerActions.selectCustomer, (state, { id }) => ({
    ...state,
    selectedCustomerId: id
  })),
  on(CustomerActions.addCustomerSuccess, (state, { customer }) =>
    adapter.addOne(customer, state)
  ),
  on(CustomerActions.updateCustomerSuccess, (state, { customer }) =>
    adapter.updateOne(customer, state)
  ),
  on(CustomerActions.deleteCustomerSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  on(CustomerActions.searchCustomer, (state, { criteria }) => ({
    ...state,
    loading: true,
    loaded: false,
    search: criteria
  }))
);

export function reducer(state: CustomerState | undefined, action: Action) {
  return customerReducer(state, action);
}

// get the selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
