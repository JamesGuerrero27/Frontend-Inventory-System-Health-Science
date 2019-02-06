import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importando los componentes para enrutarlos.
import { NavComponent } from './@theme/nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent
  },
  {
    path: '**', component: NavComponent
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
