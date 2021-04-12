import { Component, OnInit } from '@angular/core';
import {TicketItemsService} from '../_.services/ticket-items.service';
import {formatDate} from '@angular/common';
import {DataHandlerService} from '../_.services/data-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})


export class CreateTicketComponent implements OnInit {
  public newTicketClientName;
  public ticketAssignees;
  public ticketDescription;
  public ticketPkg;
  public clientId;
  public initialComment;

  constructor(private ticketServiceActual: TicketItemsService,
              private dataHandler: DataHandlerService,
              private router: Router) { }

  ngOnInit(): void {
    this.newTicketClientName = sessionStorage.getItem('currentClientName') || "Green Garden LLC.";
    this.clientId = sessionStorage.getItem('currentClientId');
  }

  saveTicketItem(): void {
    if(this.newTicketClientName == "" || this.ticketAssignees == "" || this.ticketDescription == ""){
      console.log("NOT ENOUGH INFO!");
    } else {
      var currDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      var savePkg = {
        "description": this.ticketDescription,
        "ticketDate": currDate,
        "assignee": [this.ticketAssignees],
        "clientId": this.clientId,
        "assigner": [this.newTicketClientName],
        "status": "*NEW",
        "comments": [this.initialComment]
      }
      this.ticketPkg = savePkg;
      this.ticketServiceActual.create(this.ticketPkg).subscribe(savedTaskItem => {

        this.ticketPkg = [];
        this.router.navigate([`dash-board`]);
      });
    }
  }
  keytab(event){
    let element = event.srcElement.nextElementSibling; // get the sibling element

    if(element == null)  // check if its null
      return;
    else
      element.focus();   // focus if not null
  }
}
