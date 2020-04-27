import { Chart } from './chart.model';

export enum ChartTypes { Linear = 'Linear', Bar = 'Bar', Pie = 'Pie' }

export class ChartBuilder {
  private type: ChartTypes;
  private configurations: Set<{}>;

  constructor() {}

  public buildChart() {
    return new Chart(this.type, this.configurations);
  }
}