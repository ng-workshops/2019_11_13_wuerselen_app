## src/app/app.component.ts

```ts
...

getRouteAnimation(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )

...
```

## src/app/app.component.html

```html
...
<div class="{{ currentTheme }}" [@fadeInAnimation]="getRouteAnimation(route)">
  <router-outlet #route="outlet"></router-outlet>
</div>
...
```

## src/app/home/home-routing.module.ts

```ts
...
const routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } }
];
...
```

## src/app/customers/customers-routing.module.ts

```ts
...
const routes: Routes = [
  {
    path: 'customers',
    component: CustomerListComponent,
    data: { animation: 'customers' }
  },
  {
    path: 'customers/new',
    component: CustomerFormComponent,
    data: { animation: 'customer' }
  },
  {
    path: 'customers/:id',
    component: CustomerFormComponent,
    data: { animation: 'customer' }
  }
];
...
```
