import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ErorrPageComponent } from './components/erorr-page/erorr-page.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'coaches', component: CoachesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'success', component: PaymentSuccessComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: ErorrPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
