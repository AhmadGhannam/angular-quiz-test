import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppdataService } from 'src/app/appdata.service';
import { DataStorageService, userDetails } from 'src/app/data-storage-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})


// Purpose: Displays detailed information about a specific user.
// Key Features:
// Fetches user details based on the user ID from the route.
// Handles a loading state (isLoading) until data is fetched.
// Provides a back button to navigate to the user list.
// Template:
// Shows a loading message while fetching user data.
// Displays user details (avatar, name, email, and ID) once loaded.
// Includes a back button to return to the main page.


export class UserDetailsComponent implements OnInit {


  userInfo!: userDetails ; // Default to null

  isLoading = true; // To handle loading state
  userDetailsSubscription!: Subscription;

  constructor(private route:ActivatedRoute,private datastorage: DataStorageService,private router:Router,
    private appdata: AppdataService) { }
    fetchUserDetails(userId: string): void {
      this.datastorage.getDetailsOfUser(userId).subscribe({
        next: (userDetails) => {
          if (userDetails) {
            console.log('User details received in another component:', userDetails);
            this.userInfo = userDetails;
          } else {
            console.warn('No user details found for ID:', userId);
          }
        },
        error: (err) => {
          console.error('Error fetching user details in another component:', err);
        }
      });

    }
    async ngOnInit(): Promise<void> {
      let user_id = this.route.snapshot.params['id'];
      this.fetchUserDetails(user_id);
      //  await new Promise(resolve => setTimeout(resolve, 40000));
      console.log(this.userInfo?.data.first_name);
      this.userDetailsSubscription = this.appdata.getUser().subscribe(
          data => {
              if (data) {
               
                  this.userInfo = data; console.log(this.userInfo.data.first_name);
                  this.isLoading = false;
              }
          },
          error => {
              console.error('Error fetching user details:', error);
              this.isLoading = false;
          }
      );
  }
  
  ngOnDestroy(): void {
    if (this.userDetailsSubscription) {
      this.userDetailsSubscription.unsubscribe();
    }
  }


  navigateBack() {
    this.router.navigate(['/users-list']); 
  }
  

}
