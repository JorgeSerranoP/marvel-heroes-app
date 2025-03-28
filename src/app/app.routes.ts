import { Routes } from '@angular/router';
import { HeroesPageComponent } from './pages/heroes-page/heroes-page.component';

export const routes: Routes = [
  { path: '', component: HeroesPageComponent },
  { path: '**', redirectTo: '' }
];
