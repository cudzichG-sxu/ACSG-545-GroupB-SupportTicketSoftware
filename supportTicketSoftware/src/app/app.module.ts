import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    CreateTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    HttpClientModule,
    MatButtonModule,
    FlexLayoutModule, MatToolbarModule, MatTabsModule, MatSidenavModule, MatIconModule, MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
