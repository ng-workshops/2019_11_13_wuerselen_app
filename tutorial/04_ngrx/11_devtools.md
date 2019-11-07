# 11 ngrx - Sync with local storage

## src/app/app.module.ts

```ts
imports [
/**
 * Store devtools instrument the store retaining past versions of state
 * and recalculating new states. This enables powerful time-travel
 * debugging.
 *
 * To use the debugger, install the Redux Devtools extension for either
 * Chrome or Firefox
 *
 * See: https://github.com/zalmoxisus/redux-devtools-extension
 */
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: environment.production
        })
      : [],
]
```
