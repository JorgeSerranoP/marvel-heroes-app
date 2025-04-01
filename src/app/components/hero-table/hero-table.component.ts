import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import { ColumnChartComponent } from "../column-chart/column-chart.component";
import { HeroFilterComponent } from "../hero-filter/hero-filter.component";

@Component({
  selector: 'app-hero-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    ColumnChartComponent,
    HeroFilterComponent
],
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss']
})
export class HeroTableComponent {
  readonly activeHeroFilters = signal<string[]>([]);
  readonly dialog = inject(MatDialog);

  heroService = inject(HeroService);

  displayedColumns: string[] = ['nameLabel', 'genderLabel', 'citizenshipLabel', 'skillsLabel', 'occupationLabel', 'memberOfLabel', 'creatorLabel', 'actionsLabel'];
  dataSource = new MatTableDataSource<Hero>();
  chartColumns: string[] = ['name', 'gender', 'citizenship', 'skills', 'occupation', 'memberOf', 'creator'];
  chartColumnsWithSuffix: string[] = this.chartColumns.map(column => column + '-chart');

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource.filterPredicate = (data: Hero, filter: string) => {
      const filters = filter.split(',');
      return filters.some(f => data.nameLabel.toLowerCase() === (f.toLowerCase()));
    };

    effect(() => {
      this.dataSource.data = this.heroService.heroes();
    });

    effect(() => {
      this.dataSource.filter = this.activeHeroFilters().join(',');
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onFiltersChanged(filters: string[]): void {
    this.activeHeroFilters.set(filters);
  }

  openDetails(hero: Hero) {
    import('../hero-modal/hero-modal.component').then(({ HeroModalComponent }) => {
      this.dialog.open(HeroModalComponent, {
        width: '400px',
        data: hero
      });
    });
  }

  addHero() {
    import('../hero-form/hero-form.component').then(({ HeroFormComponent }) => {
      this.dialog.open(HeroFormComponent, {
        width: '400px',
        data: {
          text: 'Create Hero'
        }
      });
    });
  }

  editHero(event: Event, hero: Hero): void {
    event.stopPropagation();
    import('../hero-form/hero-form.component').then(({ HeroFormComponent }) => {
      this.dialog.open(HeroFormComponent, {
        width: '400px',
        data: {
          ...hero,
          text: 'Edit Hero'
        }
      });
    });
  }

  deleteHero(event: Event, hero: Hero): void {
    event.stopPropagation();
    this.heroService.removeHero(hero);
  }

  getColumnData(column: string): string[] {
    const data = this.dataSource.data.map((row: any) => row[column + 'Label']);
    return data;
  }
}
