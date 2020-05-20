import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { Chart } from 'chart.js';
import { ChartBuilder } from './chart-builder.model';
import { AdminChart } from './chart.model';

interface DataSet {
    label?: string;
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
    template: ` <canvas [attr.id]="id" width="400" height="400"></canvas> `,
    styles: [``],
})
export class GraphComponent implements OnInit, AfterViewInit {
    @Input() id: string;
    @Input() chartConfig: AdminChart;

    constructor() {}

    ngAfterViewInit() {
        console.log('aquiii', {...this.chartConfig.chartJsConfig})
        new Chart(document.getElementById(this.id), {...this.chartConfig.chartJsConfig})
    }

    ngOnInit() {}
}
