import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoModule, TRANSLOCO_CONFIG } from '@ngneat/transloco';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import ngx-translate-messageformat-compiler
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { environment } from '../environments/environment';
// Routing Module
import { AppRoutingModule } from './app-routing.module';
// App Root
import { AppComponent } from './app.component';
// Shared Services
import { CoreModule } from './core/core.module';
import { httpInterceptorProviders } from './core/http-interceptors';
import { CustomSerializer } from './core/router/router.serializer';
import { CustomersModule } from './customers/customers.module';
// Feature Modules
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { effects, metaReducers, reducers, runtimeChecks } from './store';
import { translocoLoader } from './transloco.loader';

// the second parameter 'de' is optional
registerLocaleData(localeDe, 'de');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ProductsModule,
    CustomersModule,
    AppRoutingModule,
    TranslocoModule,
    TranslocoMessageFormatModule.init(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      // compiler configuration
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(effects),
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
      : []
  ],
  declarations: [AppComponent],
  providers: [
    httpInterceptorProviders,
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
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/ngx-translate/');
}
