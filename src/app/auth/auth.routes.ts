import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('@auth/login-page.component').then(
            (m) => m.LoginPageComponent
          ),
      },
      {
        path: 'new-account',
        loadComponent: () =>
          import('@auth/register-page.component').then(
            (m) => m.RegisterPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
