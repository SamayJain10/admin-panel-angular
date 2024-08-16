import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardComponent ,
    UsersComponent,
    SettingsComponent,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
      ]
})
export class AdminModule { }
