import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, output, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Hero } from '../../../../core/models/hero';
import { HERO_COLUMNS } from '../../../../core/models/hero-table.config';
import { HeroService } from '../../../../core/services/hero.service';
import { ColumnChartComponent } from "../../../../shared/components/column-chart/column-chart.component";

@Component({
  selector: 'app-hero-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ColumnChartComponent
  ],
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss']
})
export class HeroTableComponent {
  readonly heroService = inject(HeroService);
  readonly isDataReady = signal(false)

  readonly edit = output<Hero>();
  readonly delete = output<Hero>();
  readonly details = output<Hero>();

  dataSource = new MatTableDataSource<Hero>();
  displayedColumns: string[] = [...HERO_COLUMNS, 'actionsLabel'];
  headerColumnsWithCharts: string[] = HERO_COLUMNS.map(column => column.replace('Label', '-chart'));

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor() {
    // Configure table filtering
    this.dataSource.filterPredicate = (data: Hero, filter: string) => {
      const filters = filter.split(',');
      return filters.some(f => data.nameLabel.toLowerCase() === (f.toLowerCase()));
    };

    // Reactively update table data and filters
    effect(() => {
      this.dataSource.data = this.heroService.heroes();
      this.dataSource.filter = this.heroService.activeHeroFilters().join(',');
      this.isDataReady.set(this.dataSource.data.length > 0);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onEdit(event: Event, hero: Hero): void {
    event.stopPropagation();
    this.edit.emit(hero);
  }

  onDelete(event: Event, hero: Hero): void {
    event.stopPropagation();
    this.delete.emit(hero);
  }

  onDetails(hero: Hero): void {
    this.details.emit(hero);
  }

  /**
   * Memoizes column data for charts.
   * This means the data is computed once and cached, and it will only be recalculated
   * when the table's data (`dataSource.data`) changes.
   *
   * For each column in HERO_COLUMNS, it removes the 'Label' suffix to create a chart column key
   * and maps the corresponding data from the table rows.
   *
   * Example:
   * If HERO_COLUMNS = ['nameLabel', 'genderLabel'], and dataSource.data contains:
   * [{ nameLabel: 'Hero1', genderLabel: 'Male' }, { nameLabel: 'Hero2', genderLabel: 'Female' }],
   * The result will be:
   * {
   *   name: ['Hero1', 'Hero2'],
   *   gender: ['Male', 'Female']
   * }
   */
  columnData = computed(() => {
    const data: { [key: string]: string[] } = {};
    HERO_COLUMNS.forEach(column => {
      const chartColumn = column.replace('Label', '');
      data[chartColumn] = this.dataSource.data.map((row: Hero) => row[column as keyof Hero] || '');
    });
    return data;
  });

  /**
   * Retrieves precomputed data for a specific chart column.
   * @param column Column name.
   * @returns Data for the column or an empty array if not found.
   */
  getChartColumnData(column: string): string[] {
    return this.columnData()[column] || [];
  }
}
