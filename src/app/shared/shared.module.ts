import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ViewUsersComponent } from './components/view-users/view-users.component';
import { UserItemComponent } from './components/view-users/user-item/user-item.component';
import { UserDetailsComponent } from './components/view-users/user-item/user-details/user-details.component';
import { LoadingComponent } from './components/view-users/loading.component.ts/loading.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ViewUsersComponent,
    UserItemComponent,
    UserDetailsComponent,
    LoadingComponent
    

  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatSlideToggleModule

  ],
  exports:[
    HeaderComponent,
    FooterComponent,

    
  ]
})


// this module provides shared components like HeaderComponent, FooterComponent, ViewUsersComponent, 
// UserItemComponent, and UserDetailsComponent.
// Includes Angular Material components (like MatCard, MatToolbar) for styling and layout.
export class SharedModule { }
