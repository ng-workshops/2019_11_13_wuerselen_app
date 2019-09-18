## src/app/customers/customer/customer.component.ts

```ts
import { animate, style, transition, trigger } from '@angular/animations';

...

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
  ]
})

...
```

## src/app/customers/customer/customer.component.html

```html
...

<div @toggle class="details" *ngIf="showDetails">
  <ng-content></ng-content>
</div>

...
```
