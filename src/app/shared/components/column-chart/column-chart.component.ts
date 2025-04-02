import { Component, OnInit, input } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {
  readonly columnName = input.required<string>();
  readonly columnData = input.required<string[]>();

  chartType: ChartType = 'bar';
  chartData: any = {};

  ngOnInit(): void {
    this.generateChart();
  }

  private generateChart(): void {
    const valueCounts = this.countValues(this.columnData());

    this.chartType = this.getChartType(valueCounts)

    this.chartData = {
      labels: Object.keys(valueCounts),
      datasets: [
        {
          label: this.columnName(),
          data: Object.values(valueCounts),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
          ],
          borderWidth: 1
        }
      ]
    };
  }

  private getChartType(valueCounts: Record<string, number>): ChartType {
    return Object.keys(valueCounts).length <= 5 ? 'pie' : 'bar';
  }

  private countValues(data: string[]): Record<string, number> {
    return data.reduce((acc: Record<string, number>, value: string) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }
}
