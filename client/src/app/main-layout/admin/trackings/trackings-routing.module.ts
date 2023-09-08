import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingsPage } from './trackings.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingsPageRoutingModule {}
