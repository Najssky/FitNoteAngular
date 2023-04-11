import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnloggedHomeComponent } from './views/unlogged-home/unlogged-home.component';

const routes: Routes = [
  {
    path: '',
    component: UnloggedHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
