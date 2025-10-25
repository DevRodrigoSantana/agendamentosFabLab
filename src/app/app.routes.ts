import { Routes } from '@angular/router';
import { Home } from './modules/pages/home/home';
import { Labs } from './modules/pages/labs/labs';
import { ControlPanel } from './modules/pages/control-panel/control-panel';
import { authGuard } from './service/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./modules/pages/home/home').then(m => m.Home) },
  { path: 'labs', loadComponent: () => import('./modules/pages/labs/labs').then(m => m.Labs) },
  { path: 'login', loadComponent: () => import('./modules/pages/login/login').then(m => m.Login) },
  {
    path: 'control-panel',
    loadComponent: () => import('./modules/pages/control-panel/control-panel').then(m => m.ControlPanel),
    canActivate: [authGuard]  
  }
];
