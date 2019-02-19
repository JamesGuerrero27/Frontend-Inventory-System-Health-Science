import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importando los componentes para enrutarlos.
import { NavComponent } from './@theme/nav/nav.component';
import { LoginComponent } from './@theme/auth/login/login.component';
import { LoadingComponent } from './@theme/loading/loading.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'home',
    component: NavComponent,
    data: { title: 'Home' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'loading',
    component: LoadingComponent,
    data: { title: 'Loading' }
  },
  {
    path: 'product',
    component: ProductsComponent,
    data: { title: 'productos' }
  },
  {
    path: '**', redirectTo: 'login' + LoginComponent
  }
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
export const RoutingComponents = [NavComponent, LoginComponent, LoadingComponent, DashboardComponent, ProductsComponent];
