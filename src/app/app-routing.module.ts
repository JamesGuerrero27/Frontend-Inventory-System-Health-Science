import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importando los componentes para enrutarlos.
import { NavComponent } from './@theme/nav/nav.component';
import { LoginComponent } from './@theme/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: '**', redirectTo: '/' + LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
export const RoutingComponents = [NavComponent, LoginComponent];
