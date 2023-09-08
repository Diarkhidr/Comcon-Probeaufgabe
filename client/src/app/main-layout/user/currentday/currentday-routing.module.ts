import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentDayPage } from './currentday.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
