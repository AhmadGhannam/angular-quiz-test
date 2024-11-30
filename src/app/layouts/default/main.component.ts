import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

//this module acts as the main layout containing a header, footer, and a router-outlet for navigation.

export class MainComponent implements OnInit {
  sideBaropen=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['./users-list']);
  }
  

}
