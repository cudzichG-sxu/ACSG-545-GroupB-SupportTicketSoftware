import { Component, OnInit } from '@angular/core';
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

  constructor() { }


  ngOnInit(): void {
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
