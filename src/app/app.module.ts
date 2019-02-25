import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    RequisitionFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
