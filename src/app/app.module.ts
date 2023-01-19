import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import { LigneComponent } from './ligne/ligne.component';
import { DialogNameComponent } from './dialog-name/dialog-name.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import { TableComponent } from './table/table.component';
import { AddButtonComponent } from './add-button/add-button.component';
import {MatButtonModule} from "@angular/material/button";
import { MontantComponent } from './montant/montant.component';

@NgModule({
  declarations: [
    AppComponent,
    LigneComponent,
    DialogNameComponent,
    TableComponent,
    AddButtonComponent,
    MontantComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatTableModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        MatIconModule,
        MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
