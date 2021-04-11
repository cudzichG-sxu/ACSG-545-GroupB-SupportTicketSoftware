import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashBoardComponent} from './dash-board/dash-board.component';
import {CreateTicketComponent} from "./create-ticket/create-ticket.component";

const routes: Routes = [
  {path: 'dash-board', component: DashBoardComponent},
  {path: 'create-ticket', component: CreateTicketComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
