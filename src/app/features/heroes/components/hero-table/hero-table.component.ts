import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Hero } from '../../../../core/models/hero';
import { CHART_COLUMNS, HERO_COLUMNS } from '../../../../core/models/hero-table.config';
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

  readonly edit = output<Hero>();
  readonly delete = output<Hero>();
  readonly details = output<Hero>();

  dataSource = new MatTableDataSource<Hero>();
  displayedColumns: string[] = [...HERO_COLUMNS, 'actionsLabel'];
  chartColumnKeys: string[] = CHART_COLUMNS;
  headerColumnsWithCharts: string[] = CHART_COLUMNS.map(column => column + '-chart');

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
   * Recalculates only when the table's data changes (`dataSource.data`).
   */
  columnData = computed(() => {
    const data: { [key: string]: string[] } = {};
    this.chartColumnKeys.forEach(column => {
      data[column] = this.dataSource.data.map((row: Hero) => row[column + 'Label' as keyof Hero] || '');
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
