# 10 ngrx - Sync with local storage

## src/app/store/index.ts

```ts
import { localStorageSync } from 'ngrx-store-localstorage';

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [performanceLogger, storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];

// export because of AOT
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['customer'] })(reducer);
}
```
