# 12 ngrx - Error logging

## src/app/customers/store/effects/customer.effects.ts

```ts
errors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CustomerActions.loadCustomersFail,
          CustomerActions.addCustomerFail,
          CustomerActions.updateCustomerFail,
          CustomerActions.deleteCustomerFail
        ),
        switchMap(({ err }) => {
          console.log('error', err);

          return this.modalService.openGlobal({
            title: 'App error',
            message: (err && err.message) || 'The error message',
            type: 'warn'
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}
```
