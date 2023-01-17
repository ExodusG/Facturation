import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import { SousGroupeComponent } from './sous-groupe/sous-groupe.component';
import { LigneComponent } from './ligne/ligne.component';
import { DialogNameComponent } from './dialog-name/dialog-name.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SousGroupeComponent,
    LigneComponent,
    DialogNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
