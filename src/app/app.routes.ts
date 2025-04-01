import { Routes } from '@angular/router';
import { HeroesPageComponent } from './pages/heroes-page/heroes-page.component';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./pages/heroes-page/heroes-page.component').then(c => c.HeroesPageComponent)
  },
  { path: '**', redirectTo: '' }
];
