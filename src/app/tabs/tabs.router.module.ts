import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sign-in',
        children: [
          {
            path: '',
            loadChildren: '../sign-in/sign-in.module#SignInPageModule'
          }
        ]
      },
      {
        path: 'sign-up',
        children: [
          {
            path: '',
            loadChildren: '../sign-up/sign-up.module#SignUpPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/sign-in',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/sign-in',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
