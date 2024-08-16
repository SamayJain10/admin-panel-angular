import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { SignupComponent } from './admin/auth/signup/signup.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserCreateComponent } from './admin/users/user-create/user-create.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component';
import { AuthGuard } from './admin/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
