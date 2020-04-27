export enum ChartTypes {
    Linear = 'Linear',
    Bar = 'Bar',
    Pie = 'Pie',
}

export class Chart {
    private type: ChartTypes;
    private configurations: Map<'dataset' | 'yAxes' | 'xAxes', {}>;
    private chartJsConfig: {};

    constructor(type: ChartTypes, configutarions: Map<'dataset' | 'yAxes' | 'xAxes', {}>) {
        this.chartJsConfig = {
            type: this.type,
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: configutarions.get('dataset'),
            },
            options: {
                scales: {
                    yAxes: configutarions.get('yAxes'),
                    xAxes: configutarions.get('xAxes'),
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
        this.configurations = configutarions;
    }
}
