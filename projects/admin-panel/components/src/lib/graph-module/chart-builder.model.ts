import { AdminChart } from './chart.model';
import { XAxisConfig, YAxisConfig, DataSetConfig } from './chart-configurations';

export enum ChartTypes { Linear = 'line', Bar = 'bar', Pie = 'pie' }

export type ConfigType = 'dataset' | 'yAxes' | 'xAxes' | 'bar-options' | 'pie-options';

export class ChartBuilder {
  private type: ChartTypes;
  private configurations = new Map<ConfigType, XAxisConfig | YAxisConfig | DataSetConfig>();

  constructor() {}

  public addConfiguration(type: ConfigType, config: XAxisConfig | YAxisConfig | DataSetConfig) {
    this.configurations.set(type, config);
    return this;
  }

  public buildChart(chartType: ChartTypes = ChartTypes.Linear) {
    return new AdminChart(chartType, this.configurations);
  }
}
