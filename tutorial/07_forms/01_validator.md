# 1 forms - custom validator

> mkdir src/app/shared/input-float
> touch src/app/shared/input-float/input-float.validator.ts

## src/app/shared/input-float/input-float.validator.ts

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

## src/app/settings/settings.model.ts

```ts
import { floatValidator } from '../shared/input-float/input-float.validator';

salary: formBuilder.control(settings.salary, floatValidator()),
```

## src/app/settings/settings.component.html

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
