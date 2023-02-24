import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { GridComponent } from './components/grid/grid.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { GridHeaderComponent } from './components/grid/grid-header/grid-header.component';
import { BlankPageComponent } from './components/blank-page/blank-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    GridComponent,
    SidebarComponent,
    DatePickerComponent,
    AutocompleteComponent,
    GridHeaderComponent,
    BlankPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
