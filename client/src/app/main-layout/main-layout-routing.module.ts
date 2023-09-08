import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutPage } from './main-layout.page';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutPage,
    children: [
      {path: '', redirectTo: '/main/user/dashboard',
      pathMatch: 'full'},
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutPageRoutingModule {}
