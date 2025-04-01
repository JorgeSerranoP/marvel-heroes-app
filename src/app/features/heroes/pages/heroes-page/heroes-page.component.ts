import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../../../core/models/hero';
import { HeroService } from '../../../../core/services/hero.service';
import { HeroFilterComponent } from "../../components/hero-filter/hero-filter.component";
import { HeroTableComponent } from '../../components/hero-table/hero-table.component';

@Component({
  selector: 'app-heroes-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroFilterComponent,
    HeroTableComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './heroes-page.component.html',
  styleUrls: ['./heroes-page.component.scss']
})
export class HeroesPageComponent {
  private readonly heroService = inject(HeroService);
  private readonly dialog = inject(MatDialog);

  openDetails(hero: Hero): void {
    import('../../components/hero-modal/hero-modal.component').then(({ HeroModalComponent }) => {
      this.dialog.open(HeroModalComponent, {
        width: '400px',
        data: hero
      });
    });
  }

  addHero(): void {
    import('../../components/hero-form/hero-form.component').then(({ HeroFormComponent }) => {
      this.dialog.open(HeroFormComponent, {
        width: '400px',
        data: { text: 'Create Hero' }
      });
    });
  }

  editHero(hero: Hero): void {
    import('../../components/hero-form/hero-form.component').then(({ HeroFormComponent }) => {
      this.dialog.open(HeroFormComponent, {
        width: '400px',
        data: { ...hero, text: 'Edit Hero' }
      });
    });
  }

  deleteHero(hero: Hero): void {
    this.heroService.removeHero(hero);
  }
}
