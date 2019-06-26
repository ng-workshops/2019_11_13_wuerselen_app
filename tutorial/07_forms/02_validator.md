# 2 forms - custom form control

$ ng generate directive shared/input-float/input-float --module shared --export
$ ng generate component shared/input-float --module shared --export

## shared/input-float/input-float.directive.ts

```ts
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { floatValidator } from './input-float.validator';

@Directive({
  selector: '[appInputFloat]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: InputFloatDirective, multi: true }
  ]
})
export class InputFloatDirective {
  validate(control: AbstractControl): { [key: string]: any } {
    return floatValidator()(control);
  }
}
```

## shared/input-float/input-float.component.ts

```ts
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getFloat, cutToDecimal } from '../utils/utils';

@Component({
  selector: 'input-float',
  templateUrl: './input-float.component.html',
  styleUrls: ['./input-float.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputFloatComponent)
    }
  ]
})
export class InputFloatComponent implements OnInit, ControlValueAccessor {
  @Input()
  numberOfDigits: number;

  @Input()
  round: boolean;

  @Input()
  placeholder: string;

  @Input()
  name: string;

  input = '';

  _value: any;
  _onChangeCallback: (value: any) => void;
  _onTouchedCallback: () => void;

  ngOnInit() {
    // init default values
    this.numberOfDigits = this.numberOfDigits || 2;
    this.round = this.round || true;
  }

  parseToFloat(value: string) {
    // set value which is delegated to form model
    this.value = getFloat(value);
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * Gets the value from the form model and sets the input
   *
   * @param {*} value
   *
   * @memberOf UlInputFloatComponent
   */
  writeValue(value: any) {
    let viewValue = value;

    // check if value is number and try to format it
    if (!isNaN(viewValue) && viewValue !== null) {
      if (this.round) {
        viewValue = parseFloat(viewValue).toFixed(this.numberOfDigits);
      } else {
        viewValue = cutToDecimal(viewValue, this.numberOfDigits);
      }

      viewValue = viewValue.replace('.', ',');
    }

    // set internal input field value
    this.input = viewValue || '';
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  /**
   * View to Model changes
   * Can be overwritten in derived classes
   */
  set value(v: any) {
    // update value when new value is different
    // OR when both values are null (to trigger the _onChangeCallback() for validation)
    if (v !== this._value || (v === null && this._value === null)) {
      this._value = v;

      if (this._onChangeCallback) {
        this._onChangeCallback(this._value);
      }
    }
  }

  /**
   * Model to View changes
   * Can be overwritten in derived classes
   */
  get value() {
    return this._value;
  }
}
```

## shared/input-float/input-float.component.html

```html
<mat-form-field>
  <input
    #field="ngModel"
    type="text"
    matInput
    appInputFloat
    [(ngModel)]="input"
    (ngModelChange)="parseToFloat($event)"
    placeholder="{{placeholder}}"
  />
  <span matPrefix>$&nbsp;</span>

  <mat-error *ngIf="field.invalid">
    Please enter a valid number
  </mat-error>
</mat-form-field>
```

## settings/settings.component.html

```html
<div class="form-row">
  <app-input-float
    formControlName="salary"
    placeholder="Salary"
    name="salary"
  ></app-input-float>
</div>
```

## settings/settings.model.ts

```ts
salary: formBuilder.control(settings.salary),
```
