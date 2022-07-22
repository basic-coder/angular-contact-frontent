import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MyContact } from '../models/myContact';
import { catchError, Observable, throwError } from 'rxjs';
import { MyGroup } from '../models/mGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl: string = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  //get all contact data
  public getAllContacts() :Observable<MyContact[]>{
    let dataUrl: string = `${this.baseUrl}/contacts`;
    return this.http.get<MyContact[]>(dataUrl).pipe(catchError(this.handleError))
  }

   //get single contact data
   public getContacts(contactId:string):Observable<MyContact>{
    let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }

   //create contact
   public createContacts(contact:MyContact):Observable<MyContact> {
    let dataUrl: string = `${this.baseUrl}/contacts`;
    return this.http.post<MyContact>(dataUrl,contact).pipe(catchError(this.handleError))
  }

   //update contact
   public updateContacts(contact:MyContact, contactId:string):Observable<MyContact> {
    let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.put<MyContact>(dataUrl,contact).pipe(catchError(this.handleError))
  }

   //update contact
   public deleteContacts(contactId:string):Observable<MyContact> {
    let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }

   //get all group data
   public getAllGroups() :Observable<MyGroup>{
    let dataUrl: string = `${this.baseUrl}/groups`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))
  }

  //get single contact data
  public getGroup(contact:MyContact):Observable<MyGroup>{
    let dataUrl: string = `${this.baseUrl}/contacts/${contact.groupId}`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))
  }

  public handleError(error:HttpErrorResponse){
    let errorMessage:string = ''
    if(error.error instanceof ErrorEvent){
      //client Error
      errorMessage = `Error :${error.error.message}`
    }else{
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage)
  }

}
