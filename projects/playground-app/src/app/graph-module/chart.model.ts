import { ConfigType } from './chart-builder.model';

export enum ChartTypes {
    Linear = 'line',
    Bar = 'bar',
    Pie = 'pie',
}

export class AdminChart {
    private type: ChartTypes;
    public chartJsConfig: {};

    constructor(type: ChartTypes, configutarions: Map<ConfigType, {}>) {
        this.type = type;
        this.chartJsConfig = {
            type: this.type,
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: configutarions.get('dataset')['config'],
            },
            options: {
                scales: {
                    yAxes: configutarions.get('yAxes') ? configutarions.get('yAxes')['config']['yAxes'] : [],
                    xAxes: configutarions.get('xAxes') ? configutarions.get('xAxes')['config']['xAxes'] : [],
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.yLabel;
                        },
                    },
                },
            },
        };
        this.type = type;
    }
}
