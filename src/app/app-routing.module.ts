import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedUserGuard } from './logged-user.guard';
import { HomeComponent } from './views/home/home.component';
import { UnloggedHomeComponent } from './views/unlogged-home/unlogged-home.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: UnloggedHomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
