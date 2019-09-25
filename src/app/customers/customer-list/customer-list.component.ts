import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { navigate } from '../../core/router/router.actions';
import { Customer } from '../customer.model';
import {
  deleteCustomer,
  loadCustomers,
  searchCustomer
} from '../store/actions/customer.actions';
import { CustomerState } from '../store/reducers/customer.reducer';
import {
  getCustomers,
  getLoading
} from '../store/selectors/customer.selectors';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent implements OnInit, OnDestroy {
  searchTerm = new FormControl();
  customers$: Observable<Customer[]> = this.store.pipe(select(getCustomers));
  loading$: Observable<boolean> = this.store.pipe(select(getLoading));

  private destroy$ = new Subject();

  constructor(private store: Store<CustomerState>) {}

  ngOnInit() {
    this.store.dispatch(loadCustomers());

    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm =>
        this.store.dispatch(searchCustomer({ criteria: searchTerm }))
      );
  }

  addNewCustomer() {
    this.store.dispatch(navigate({ path: ['customers', 'new'] }));
  }

  deleteCustomer(id: number) {
    this.store.dispatch(deleteCustomer({ id }));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  trackByFn(idx, item) {
    return item.id;
  }
}
