import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { userDetails, userInfo } from './data-storage-service.service';

@Injectable({
  providedIn: 'root'
})



// this AppdataService Manages application state, such as storing the list of users and individual user details.
// Uses RxJS Subject and BehaviorSubject to emit data changes.
export class AppdataService {
  
  private users:userInfo[]=[];
  private usersChanged=new Subject<userInfo[]>();

  private user!:userDetails;
  private userChanged= new BehaviorSubject<userDetails | null>(null);


  setUsers(users: userInfo[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice()); // Emit updated state
    console.log('Users set:', this.users);
  }
  
  addMoreUsers(users: userInfo[]) {
    if(users.length==0){
      alert('there is no more users');
      return;
    }
    this.users.push(...users); // Append all users efficiently
    this.usersChanged.next(this.users.slice()); // Emit updated state
    console.log('Users added:', users);
  }
  

  getUsers(){
    console.log("ZZZZ"+this.users);
    return this.users.slice();
  }

  setUser(user: userDetails) {
    this.user = user;
    this.userChanged.next(user); // Emit updated state
    console.log('User set:', this.user);
  }

  getUser(): Observable<userDetails | null> {
    return this.userChanged.asObservable();
  }
  



  constructor() { }
}
