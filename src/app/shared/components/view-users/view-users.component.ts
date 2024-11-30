import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppdataService } from 'src/app/appdata.service';
import { DataStorageService, userInfo } from 'src/app/data-storage-service.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})

// Purpose of this component: Displays a list of users and provides a "View More" functionality to load additional users.
// Key Features:
// Fetches and displays user data (userDetails).
// Shows a loading indicator while data is being fetched (isloadingMode and isloadingMode2).
// Emits an event (userWasSelected) when a user is clicked.
// Template:
// Loops over the list of users and displays each user using the UserItemComponent.
// Includes a "View More" button that fetches additional users when clicked.
export class ViewUsersComponent implements OnInit {

  userDetails!: userInfo[];

  isloadingMode=false;
  isloadingMode2=false;
  showClick=false;

  @Output() userWasSelected = new EventEmitter<userInfo>();
  


  constructor(private appdata: AppdataService, private dataStorage: DataStorageService) { }

  async ngOnInit(): Promise<void> {
    this.isloadingMode=true;
    this.showClick=true;
    this.dataStorage.getAllUsers(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    this.userDetails = this.appdata.getUsers();
    this.isloadingMode=false;
    this.showClick=false;
  }


  onuserSelected(user: userInfo) {
    this.userWasSelected.emit(user);
  }


  async viewMore(){
    this.isloadingMode2=true;
    this.dataStorage.getAllUsers(false);
    await new Promise(resolve => setTimeout(resolve, 500));
    this.userDetails = this.appdata.getUsers();
    this.isloadingMode2=false;
  }

}
