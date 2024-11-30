import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, Subscription, switchMap } from 'rxjs';

import { DataStorageService, userDetails } from 'src/app/data-storage-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private searchSubject = new Subject<string>();

  constructor(private dataService: DataStorageService, private router: Router) { }

  searchQuery: string = '';

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

 


  ngOnInit(): void {
    
  this.searchSubject.pipe(
  debounceTime(300), // Wait 300ms between keystrokes
  distinctUntilChanged(), // Ignore duplicate inputs
  switchMap((userId) =>
    userId ? this.dataService.getDetailsOfUser(userId) : of(null) // Handle empty input
  )
).subscribe({
  next: (user) => {
    if (user && user.data) {
      
      // Navigate to the user's details page
      this.router.navigate(['/user-details', user.data.id]);
    
    
    } else {
      console.log('User not found');
    }
  },
  error: (err) => console.error('Error fetching user:', err)
});


  }
  onSearchInput(userId: string) {
    this.searchSubject.next(userId.trim());
  }
  
  ngOnDestroy() {

  }


}
