import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { AppdataService } from './appdata.service';

export interface UsersResponse{
  page:number,
  per_page:number,
  total:number,
  total_pages:number,
  data:userInfo[],
  support:{
    url:string,
    text:string
  }
}

export interface userInfo{
  id:number ;
  first_name:string;
  last_name:string;
  email:string;
  avatar:string;
}


export interface userDetails{
  [x: string]: any
  data:userInfo,
  support:{
    url:string,
    text:string
  }
}


@Injectable({
  providedIn: 'root'
})

// this DataStorageService Handles API calls to fetch users and user details.
// Includes error handling and state updates via AppDataService.

// Data Flow
// DataStorageService fetches data from the API (https://reqres.in/api/users) and updates the state in AppDataService.
// Components subscribe to these state updates to reflect changes in the UI.
export class DataStorageService {

  static API_Location : string = "https://reqres.in/api/users" ;
  pagination=0;
  constructor(private http:HttpClient,private appService:AppdataService) { }

  getAllUsers(isMore:boolean){
    this.pagination++;
    console.log("get-getAllUsers");

    if(isMore)this.pagination=1;

    if(this.pagination==1){
     
      return this.http.get<UsersResponse>(`${DataStorageService.API_Location}?page=`+this.pagination)
          .subscribe(
              data => {
              console.log(data);
              this.appService.setUsers(data.data);
      }
     ); 
    }

    return this.http.get<UsersResponse>(`${DataStorageService.API_Location}?page=`+this.pagination)
          .subscribe(
              data => {
              console.log(data.data.length);
              this.appService.addMoreUsers(data.data);
      }
     );
  }


  getDetailsOfUser(userId: string): Observable<userDetails | null> {
    const url = `${DataStorageService.API_Location}/${userId}`;
    console.log('11111 - Initiating API call to:', url);
  
    return this.http.get<userDetails>(url).pipe(
      tap((response: userDetails) => {
        console.log('22222 - Received response:', response);
        if (response) {
          console.log('33333 - Setting user data');
          this.appService.setUser(response); // Update the app state
        }
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return of(null); // Gracefully handle errors
      })
    );
  }
  
  
}
