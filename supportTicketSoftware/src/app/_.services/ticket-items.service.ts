import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TicketItemsService {

  constructor(private http: HttpClient) {

  }

  getAllTickets( clientQueryId ): Observable<any> {
    return this.http.get <any>(`${environment.apiUrl}/allTickets/?clientId=${clientQueryId}`);
  }

  create(newTicketItem): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/submitNewTicket`, {savePkg: newTicketItem});
  }

  delete( ticketToBeDeleted ): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/deleteTicket/?id=${ticketToBeDeleted}`, {});
  }
}
