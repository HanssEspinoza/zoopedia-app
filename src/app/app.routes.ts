import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@zoopedia/zoopedia.routes').then((m) => m.zoopediaRoutes),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
