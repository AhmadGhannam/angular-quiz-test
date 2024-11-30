import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService, userInfo } from 'src/app/data-storage-service.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})


// Purpose of this component: Represents an individual user as a clickable card in the user list.
// Key Features:
// Accepts input properties (userItem and index) to render user-specific data.
// Navigates to a user detail page when clicked (viewUserDetails()).
// Template:
// Displays the user's image, first name, and last name in a styled card.
// Triggers the viewUserDetails() function on click.



export class UserItemComponent implements OnInit {



  @Input() index!: number;
  @Input() userItem!: userInfo;

  constructor(private router:Router,private datastorage: DataStorageService) { }

  ngOnInit(): void {
  }

  async viewUserDetails() {
    let user_id = this.userItem.id;
    this.router.navigate(['user-details', user_id]); // Navigate to internal route
    // await this.datastorage.getDetailsOfUser(user_id.toString());
    console.log(`Navigating to internal route: user-details/${user_id}`);
}


}
