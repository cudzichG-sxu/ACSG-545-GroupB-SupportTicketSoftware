import { Component, OnInit } from '@angular/core';
import {TicketItemsService} from '../_.services/ticket-items.service';
import {ClientItemsService} from '../_.services/client-items.service';

import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DashBoardComponent implements OnInit {
  columnsToDisplay = ['Ticket', 'Assigned_To', 'Status', 'Date', 'Priority'];
  dataSource = ticketData;
 expandedElement: ticketObject | null;


 public returnedTickets;
 public clientId;
 //save pkg for tickets, must include: description, ticketDate, assignee, clientId, assigner, status, comments
 public ticketPkg;
 public newClientItem;
 public returnedClients;

  constructor(private ticketServiceActual: TicketItemsService,
              private clientServiceActual: ClientItemsService) {

  }


  ngOnInit(): void {
    this.clientServiceActual.getAllClients().subscribe(returnClients => {
      this.returnedClients = returnClients;
    });

    //returns tickets based on clientId, so that ONLY tickets that the client returned are pulled.
    this.ticketServiceActual.getAllTickets(this.clientId).subscribe(returnedTickets => {
      this.returnedTickets = returnedTickets;

    });
  }

  saveTicketItem(): void {
    this.ticketServiceActual.create(this.ticketPkg).subscribe(savedTaskItem => {
      this.returnedTickets.push(savedTaskItem);

      this.ticketPkg = [];
    });
  }

  deleteTicket(ticketMarkedForDeletion, index): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.ticketServiceActual.delete(ticketMarkedForDeletion).subscribe(taskIdMarked => {

      // tslint:disable-next-line:triple-equals
      if (index != -1) {
        this.returnedTickets.splice(index, 1);
      }
    });
  }

  saveNewClient(): void {
    this.clientServiceActual.create(this.newClientItem).subscribe(saveProjectItem => {
      this.returnedClients.push(saveProjectItem);
      // clears out text field on page for cleaner UI
      this.newClientItem = '';
    });
  }

  deleteClient(clientIdMarked, index): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.clientServiceActual.delete(clientIdMarked).subscribe(projectIdMarked => {

      // tslint:disable-next-line:triple-equals
      if (index != -1) {
        this.returnedClients.splice(index, 1);
      }
    });
  }
}

export interface ticketObject {
  Ticket: string;
  Assigned_To: string;
  Status: string;
  Date: string;
  Priority: string;
  comments: string[];
}

//remove once tickets are being pulled via server side
const ticketData: ticketObject[] = [
  {
    Ticket: "Finance page crashing on segue",
    Assigned_To: "David Lee",
    Status: "In Progress",
    Date: "2021-03-01",
    Priority: "LOW",
    comments: ["Hubert Watson: Why is this still not done!", "David Lee: This ticket has been marked low priority, but I'll have it done this week!"]
  }, {
    Ticket: "Main dashboard stuck on loading",
    Assigned_To: "Tommy Trumpet",
    Status: "Completed!!",
    Date: "2020-12-20",
    Priority: "HIGH",
    comments: ["Tommy Trumpet: It looks like this is due to the isUserInteraction boolean being set to false, this is fix!", "Ashley Parkson: Thanks Tommy!", "Tommy Trumpet: No problem!"]
  }
];
