import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { Impressum2Component } from './impressum2/impressum2.component';
import { Impressum3Component } from './impressum3/impressum3.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { InfoItemComponent } from './info-item/info-item.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    TranslateModule,
    MatCardModule,
    TranslocoModule
  ],
  declarations: [
    HomeComponent,
    InfoBoxComponent,
    InfoItemComponent,
    ImpressumComponent,
    Impressum2Component,
    Impressum3Component
  ]
})
export class HomeModule {}
