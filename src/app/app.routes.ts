import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./features/heroes/pages/heroes-page/heroes-page.component').then(c => c.HeroesPageComponent)
  },
  { path: '**', redirectTo: '' }
];
