# 9 ngrx - Meta reducers

## src/app/store/index.ts

```ts
import { performanceLogger } from '../core/router/performance-logger';

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [performanceLogger]
  : [];

export const runtimeChecks = {
  strictStateImmutability: true,
  strictActionImmutability: true,
  strictStateSerializability: true,
  strictActionSerializability: false // https://github.com/ngrx/platform/issues/1834
};
```

## src/app/app.module.ts

```ts
StoreModule.forRoot(reducers, { metaReducers, runtimeChecks }),
```
