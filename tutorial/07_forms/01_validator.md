# 1 forms - custom validator

> create shared/input-float/input-float.validator.ts

## shared/input-float/input-float.validator.ts

```ts
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { isEmpty, FLOAT_REGEX } from '../utils/utils';

export function floatValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;

    if (isEmpty(value)) {
      return null;
    }

    if (!FLOAT_REGEX.test(value)) {
      return { float: { value, expected: 'number', actual: typeof value } };
    }

    return null;
  };
}
```

## settings/settings.model.ts

```ts
salary: formBuilder.control(settings.salary, floatValidator()),
```

## settings/settings.component.html

```html
<div class="form-row">
  <mat-form-field>
    <input type="text" matInput placeholder="Salary" formControlName="salary" />
    <mat-error *ngIf="form.get('salary').hasError('float')">
      Please enter a valid number
    </mat-error>
  </mat-form-field>
</div>
```
