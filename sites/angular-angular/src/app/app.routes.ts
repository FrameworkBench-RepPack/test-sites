import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/index.page'),
  },
  {
    path: '',
    loadComponent: () => import('./pages/(rest).page'),
    children: [
      {
        path: 'faq',
        loadComponent: () => import('./pages/(rest)/faq.page'),
      },
      {
        path: 'list',
        loadComponent: () => import('./pages/(rest)/list.page'),
      },
      {
        path: 'live',
        loadComponent: () => import('./pages/(rest)/live.page'),
      },
      {
        path: 'static-1',
        loadComponent: () => import('./pages/(rest)/static-1.page'),
      },
      {
        path: 'static-2',
        loadComponent: () => import('./pages/(rest)/static-2.page'),
      },
      {
        path: 'tooltips',
        loadComponent: () => import('./pages/(rest)/tooltips.page'),
      },
    ],
  },
];
