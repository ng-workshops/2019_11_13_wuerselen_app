import {
  animate,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [
    trigger('toggle', [
      transition(':enter', [
        animate(
          '2s',
          keyframes([
            style({ backgroundColor: 'blue', offset: 0 }),
            style({ backgroundColor: 'red', offset: 0.8 }),
            style({ backgroundColor: 'orange', offset: 1.0 })
          ])
        )
      ]),
      transition(':leave', [animate('1s', style({ opacity: 0 }))])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerComponent implements OnInit {
  @HostBinding('class.customers') hostStyle = true;

  @Input() customer: Customer;

  @Output() deleteCustomer = new EventEmitter<number>();

  showDetails = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  delete(id: number) {
    this.deleteCustomer.emit(id);
  }

  edit() {
    this.router.navigate(['customers', this.customer.id]);
  }

  showMore() {
    this.showDetails = !this.showDetails;
  }
}
