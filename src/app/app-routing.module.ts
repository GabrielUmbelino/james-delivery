import { EstablishmentDetailsComponent } from './components/establishment-details/establishment-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstablishmentsComponent } from './components/establishments/establishments.component';


const routes: Routes = [
  {
    path: '', component: EstablishmentsComponent
  },
  {
    path: 'establishment/:establishmentId', component: EstablishmentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
