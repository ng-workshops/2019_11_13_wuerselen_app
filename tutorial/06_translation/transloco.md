# Internationalization - transloco

> ng generate component home/impressum3

## src/app/home/home-routing.module.ts

```ts
...

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home/impressum', component: ImpressumComponent },
  { path: 'home/impressum2', component: Impressum2Component },
  { path: 'home/impressum3', component: Impressum3Component }
];

...
```

## src/app/app.component.html

```html
<nav>
  ...

  <a routerLink="home/impressum" routerLinkActive="active">Impressum</a>
  <a routerLink="home/impressum2" routerLinkActive="active">Impressum2</a>
  <a routerLink="home/impressum3" routerLinkActive="active">Impressum3</a>

  ...
</nav>
```

## src/app/app.module.ts

```ts
import { HttpClient } from '@angular/common/http';
import { translocoLoader } from './transloco.loader';
import { TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    ...

    TranslocoModule,
    TranslocoMessageFormatModule.init(),

    ...
  ],
  providers: [
    ...

    translocoLoader,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['en', 'de'],
        reRenderOnLangChange: true, // should be enabled when the user can change the language at runtime
        prodMode: environment.production,
        defaultLang: 'en'
      }
    },

    ...
  ]
  ...
})
export class AppModule {}
```

## src/app/home/home.module.ts

```ts
@NgModule({
  ...
   imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    TranslateModule,
    MatCardModule,
    TranslocoModule
  ],
})
export class HomeModule {}
```

## src/app/home/impressum3/impressum3.component.html

```html
<button (click)="useLanguage('en')">In english</button>
<button (click)="useLanguage('de')">Auf Deutsch</button>

<ng-container *transloco="let t; read: 'impressum'">
  <h1>{{ t('title') }}</h1>
</ng-container>

<h3>{{ 'impressum.greeting' | transloco: { name: user.name } }}</h3>

<p transloco="impressum.content"></p>

<div [innerHTML]="'impressum.info' | transloco"></div>

<!-- Only works when language file is already loaded -->
<div>This is the title loaded from Code: {{ fromCode }}</div>
<div>This is the title loaded from Code: {{ fromCode$ | async }}</div>

<br />

<footer>
  <a transloco="impressum.sitemap"></a> | <a transloco="impressum.career"></a> |
  <a transloco="impressum.home"></a>

  <br />
  <br />
  <br />

  <div>
    <span transloco="general.lastupdatedAt"></span
    ><span>{{ lastUpdatedAt | date: 'short':undefined:locale }}</span> (
    <span transloco="impressum.days" [translocoParams]="{ days: days }"></span>)
    <br />
    <ng-container>{{ 'general.copyright' | transloco }}</ng-container>
  </div>

  <ul>
    <li
      transloco="impressum.developers"
      [translocoParams]="{ gender: 'female', name: 'Sarah' }"
    ></li>
    <li
      transloco="impressum.developers"
      [translocoParams]="{ gender: 'male', name: 'Peter' }"
    ></li>
    <li>
      {{ 'impressum.developers' | transloco: { gender: 'male', name: 'Peter' }
      }}
    </li>
    <li>
      {{ 'impressum.developers' | transloco: { name: 'Sarah + Peter' } }}
    </li>
  </ul>
</footer>
```

## src/app/home/impressum3/impressum3.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-impressum3',
  templateUrl: './impressum3.component.html',
  styleUrls: ['./impressum3.component.scss']
})
export class Impressum3Component implements OnInit {
  private today = new Date();
  locale: string;

  lastUpdatedAt = new Date(2019, 10, 15, 10, 10, 10);
  days = Math.floor(
    (this.today.getTime() - this.lastUpdatedAt.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  user = {
    name: 'Homer Simpsons'
  };
  fromCode: string;
  fromCode$ = this.translocoService.langChanges$.pipe(
    tap(event => (this.locale = event)),
    map(() => this.translocoService.translate('impressum.title'))
  );

  constructor(private translocoService: TranslocoService) {}

  ngOnInit() {
    this.locale = this.translocoService.getActiveLang();
    // language file might not be loaded yet...
    this.fromCode = this.translocoService.translate('impressum.title');
  }

  useLanguage(language: string) {
    this.translocoService.setActiveLang(language);
  }
}
```
