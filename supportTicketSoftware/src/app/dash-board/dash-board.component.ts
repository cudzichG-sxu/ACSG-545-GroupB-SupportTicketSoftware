import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {TicketItemsService} from '../_.services/ticket-items.service';
import {ClientItemsService} from '../_.services/client-items.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataHandlerService} from '../_.services/data-handler.service';
// @ts-ignore
import {MatTable} from '@angular/material';

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
  columnsToDisplay = ['description', 'assignee', 'ticketDate', 'status'];
  public ticketData;
 expandedElement: ticketObject | null;
  @ViewChild('Description') Description: ElementRef;
  @ViewChild('table') table: MatTable<Element>;

 public clientId;
 //save pkg for tickets, must include: description, ticketDate, assignee, clientId, assigner, status, comments
 public ticketPkg;
 public newClientItem;
 public returnedClients;
 public newComment;
 public priorityLevel;
  constructor(private ticketServiceActual: TicketItemsService,
              private clientServiceActual: ClientItemsService,
              private router: Router,
              private dataHandler: DataHandlerService) {

  }

  ngOnInit(): void {
    // this.clientServiceActual.getAllClients().subscribe(returnClients => {
    //   this.returnedClients = returnClients;
    // });
    //
    // //returns tickets based on clientId, so that ONLY tickets that the client returned are pulled.
    this.clientId = "test123";
    this.priorityLevel = ["HIGH", "LOW", "AVERAGE"]
    this.ticketServiceActual.getAllTickets(this.clientId).subscribe(returnedTickets => {
      this.ticketData = returnedTickets;

    });
  }

  goToPage(pageName:string) {
    this.dataHandler.clientId = "test123";
    this.dataHandler.clientName = "Green Garden LLC.";
    sessionStorage.setItem('currentClientId', "test123");
    sessionStorage.setItem('currentClientName', "Green Garden LLC.");
    this.router.navigate([`${pageName}`]);
  }

  deleteTicket(ticketMarkedForDeletion, index): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.ticketServiceActual.delete(ticketMarkedForDeletion).subscribe(taskIdMarked => {

      // tslint:disable-next-line:triple-equals
      if (index != -1) {
        this.ticketData.splice(index, 1);
      }
    });
  }

  updateComments(index): void {
    // tslint:disable-next-line:no-shadowed-variable
    if(this.newComment == "") {
      console.log("EMPTY COMMENT!")
    } else {
      this.ticketServiceActual.updateComments(this.newComment, index).subscribe( ticketMarkedForUpdate => {
      })
      this.clientId = "test123"
      this.ticketServiceActual.getAllTickets(this.clientId).subscribe(returnedTickets => {
        this.ticketData = returnedTickets;
        this.table.renderRows();
      });
      this.newComment = '';
      this.Description.nativeElement.value = '';
    }
  }

//might add these later, due to time constraints, cannot add these in now.
  // saveNewClient(): void {
  //   this.clientServiceActual.create(this.newClientItem).subscribe(saveProjectItem => {
  //     this.returnedClients.push(saveProjectItem);
  //     // clears out text field on page for cleaner UI
  //     this.newClientItem = '';
  //   });
  // }
  //
  // deleteClient(clientIdMarked, index): void {
  //   // tslint:disable-next-line:no-shadowed-variable
  //   this.clientServiceActual.delete(clientIdMarked).subscribe(projectIdMarked => {
  //
  //     // tslint:disable-next-line:triple-equals
  //     if (index != -1) {
  //       this.returnedClients.splice(index, 1);
  //     }
  //   });
  // }
}

export interface ticketObject {
  description: string;
  assignee: string;
  ticketDate: string;
  status: string;
  comments: [];
}
