import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'trackings',
    loadChildren: () => import('./trackings/trackings.module').then( m => m.TrackingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
