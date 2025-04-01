import { Component } from '@angular/core';
import { HeroTableComponent } from "../../components/hero-table/hero-table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heroes-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heroes-page.component.html',
  styleUrls: ['./heroes-page.component.scss']
})
export class HeroesPageComponent {
  heroTableComponent = import('../../components/hero-table/hero-table.component').then(m => m.HeroTableComponent);
}
