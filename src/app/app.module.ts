import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
