import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { Impressum2Component } from './impressum2/impressum2.component';
import { Impressum3Component } from './impressum3/impressum3.component';

const routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'home/impressum', component: ImpressumComponent },
  { path: 'home/impressum2', component: Impressum2Component },
  { path: 'home/impressum3', component: Impressum3Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
