import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const zoopediaRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'new-animal',
        loadComponent: () =>
          import('@zoopedia/new-page.component').then(
            (m) => m.NewPageComponent
          ),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('@zoopedia/search-page.component').then(
            (m) => m.SearchPageComponent
          ),
      },
      {
        path: 'list',
        loadComponent: () =>
          import('@zoopedia/list-page.component').then(
            (m) => m.ListPageComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('@zoopedia/new-page.component').then(
            (m) => m.NewPageComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('@zoopedia/animal-page.component').then(
            (m) => m.AnimalPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
