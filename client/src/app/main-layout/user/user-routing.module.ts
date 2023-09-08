import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./currentday/currentday.module').then( m => m.CurrentDayPageModule)
  },
  {
    path: 'trackings',
    loadChildren: () => import('./trackings/trackings.module').then( m => m.TrackingsPageModule)
  },
  {
    path: 'tracking/:id',
    loadChildren: () => import('./tracking/tracking.module').then( m => m.TrackingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
