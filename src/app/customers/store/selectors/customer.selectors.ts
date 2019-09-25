import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterState } from '../../../store';
import {
  customerFeatureKey,
  CustomerState,
  selectAll,
  selectEntities
} from '../reducers/customer.reducer';
/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getCustomersStore = createFeatureSelector<CustomerState>(
  customerFeatureKey
);

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state.
 */
export const getLoading = createSelector(
  getCustomersStore,
  store => store.loading
);

// export const getCustomers = createSelector(
//   getCustomersStore,
//   store => store.customers
// );

export const getCustomers = createSelector(
  getCustomersStore,
  selectAll
);

export const getCustomersEntities = createSelector(
  getCustomersStore,
  selectEntities
);

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

// export const getSelectedCustomerFromRouter = createSelector(
//   getCustomers,
//   getRouterState,
//   (customers, router) =>
//     customers.find(c => c.id.toString() === router.state.params.id) || {}
// );

export const getSelectedCustomerFromRouter = createSelector(
  getCustomersEntities,
  getRouterState,
  (entities, router) => entities[router.state.params.id]
);

export const getLoaded = createSelector(
  getCustomersStore,
  store => store.loaded
);
