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
  MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule,MatCheckboxModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { NotificationsComponent } from './@theme/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    NotificationsComponent,

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
    MatAutocompleteModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
