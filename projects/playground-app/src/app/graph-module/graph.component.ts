import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    AfterViewInit
} from '@angular/core';
import { Chart } from 'chart.js';

interface DataSet {
    label?: string,
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
}

interface GraphConfig {
    id: string;
    type: 'bar' | 'pie' | 'lineal';
    labels: string[];
    data: DataSet[];
    showXGridLines: boolean; //todas excepto la principal
    showYGridLines: boolean; //todas excepto la principal
    showCeroXLine: boolean; //todas incluyendo la principal
    showCeroYLine: boolean; //todas incluyendo la principal
    showYLabels: boolean;
    showXLabels: boolean;
}

@Component({
    selector: 'admin-chart',
    template: `
        <canvas [attr.id]="graphConfig.id" width="400" height="400"></canvas>
    `,
    styles: [``]
})
export class GraphComponent implements OnInit, AfterViewInit {
    @Input() graphConfig: GraphConfig;
    
    constructor() {}

    ngAfterViewInit() {
        const { data } = this.graphConfig;

        new Chart(document.getElementById(this.graphConfig.id), {
            type: this.graphConfig.type,
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: data
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                //color: [''],
                                display: false
                            },
                            ticks: {
                                beginAtZero: true,
                                display: false //this will remove only the label
                            }
                        }
                    ],xAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            //color: [''],
                            display: false
                        }
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                       label: function(tooltipItem) {
                              return tooltipItem.yLabel;
                       }
                    }
                }
            }
        });
    }

    ngOnInit() {}
}
