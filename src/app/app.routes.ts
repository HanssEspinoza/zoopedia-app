import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@zoopedia/zoopedia.routes').then((m) => m.zoopediaRoutes),
  },
  {
    path: '404',
    loadComponent: () =>
      import('@shared/pages').then((m) => m.Error404Component),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
