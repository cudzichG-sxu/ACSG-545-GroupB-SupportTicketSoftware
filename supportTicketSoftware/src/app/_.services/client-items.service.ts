import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientItemsService {

  constructor(private http: HttpClient) {

  }

  getAllClients(): Observable<any> {
    return this.http.get <any>(`${environment.apiUrl}/allClients`);
  }

  create(newClient): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/newClient`, {name: newClient});
  }

  delete( clientMarkedForDeletion ): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/deleteClient/?id=${clientMarkedForDeletion}`, {});
  }
}
