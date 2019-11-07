# 10 ngrx - Sync with local storage

## src/app/store/index.ts

```ts
import { localStorageSync } from 'ngrx-store-localstorage';
import { customerFeatureKey } from '../customers/store/reducers/customer.reducer';

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [performanceLogger, localStorageSyncReducer]
  : [localStorageSyncReducer];

// export because of AOT
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: [customerFeatureKey] })(reducer);
}
```
