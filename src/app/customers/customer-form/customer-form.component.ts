import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { navigate } from '../../core/router/router.actions';
import { Customer } from '../customer.model';
import { addCustomer, updateCustomer } from '../store/actions/customer.actions';
import { CustomerState } from '../store/reducers/customer.reducer';
import { getSelectedCustomerFromRouter } from '../store/selectors/customer.selectors';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(private store: Store<CustomerState>) {}

  ngOnInit() {
    this.form = Customer.toFormGroup();

    this.store
      .pipe(
        select(getSelectedCustomerFromRouter),
        filter(customer => Boolean(customer)),
        takeUntil(this.destroy$)
      )
      .subscribe(customer => {
        this.form.patchValue(customer);
      });
  }

  submit() {
    const data = this.form.getRawValue();
    this.store.dispatch(
      data.id
        ? updateCustomer({ customer: data })
        : addCustomer({ customer: data })
    );
  }

  cancel() {
    this.store.dispatch(navigate({ path: ['customers'] }));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
