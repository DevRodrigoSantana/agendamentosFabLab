import { Routes } from '@angular/router';
import { Home } from './modules/pages/home/home';
import { Labs } from './modules/pages/labs/labs';

export const routes: Routes = [
      {
    path: '',
    loadComponent: () => import('./modules/pages/home/home').then(m => m.Home)
  },
  {
    path: 'labs',
    loadComponent: () => import('./modules/pages/labs/labs').then(m => m.Labs)
  }
];
