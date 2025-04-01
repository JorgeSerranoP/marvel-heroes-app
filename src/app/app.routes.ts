import { Routes } from '@angular/router';
import { HeroesPageComponent } from './features/heroes/pages/heroes-page/heroes-page.component';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./features/heroes/pages/heroes-page/heroes-page.component').then(c => c.HeroesPageComponent)
  },
  { path: '**', redirectTo: '' }
];
