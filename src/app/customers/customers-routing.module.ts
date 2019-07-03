import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerExistsGuard } from './guards/customer-exists.guard';

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
    data: { animation: 'customer' },
    canActivate: [CustomerExistsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
