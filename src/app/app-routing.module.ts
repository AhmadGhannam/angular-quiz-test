import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './shared/components/view-users/view-users.component';
import { UserDetailsComponent } from './shared/components/view-users/user-item/user-details/user-details.component';
import { MainComponent } from './layouts/default/main.component';
const routes: Routes = [
  {path:'' , component:MainComponent,
  children:[
  {path:'users-list',component:ViewUsersComponent},
  {path:'user-details/:id',component:UserDetailsComponent}

]
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// Defines two main routes:
// /users-list: Displays the user list (ViewUsersComponent).
// /user-details/:id: Shows detailed user information (UserDetailsComponent).
export class AppRoutingModule { }
