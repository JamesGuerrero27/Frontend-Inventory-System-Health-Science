import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

// IMPORT PARA ANGULAR MATERIAL
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatCardModule,
  MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule,
  MatCheckboxModule, MatAutocompleteModule, MatStepperModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { RequisitionFormComponent } from './pages/requisition-form/requisition-form.component';
import { NotificationsComponent } from './@theme/notifications/notifications.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { AutoFocusDirective } from './@theme/directives/auto-focus.directive';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    RequisitionFormComponent,
    NotificationsComponent,
    ProviderComponent,
    AutoFocusDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatStepperModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
