export interface XAxisConfig {
    config: {
        xAxes: [
            {
                ticks: {
                    display: boolean
                },
                gridLines: {
                    color?: string[],
                    display: boolean
                },
            },
        ],
    };
}

export interface YAxisConfig {
    config: {
        yAxes: [
            {
                ticks: {
                    display: boolean;
                };
                gridLines: {
                    color: string[],
                    display: boolean;
                };
            }
        ];
    };
}

type LineData = {
    data: number[]
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
    label?: string;
    borderDash: number[];
    lineTension: number,
    pointRadius: number,
    fill: boolean | string,
}


export interface BarOptionsConfig {
    config: {
        barPercentage?: number,
        categoryPercentage?: number,
        barThickness?: number | string,
        maxBarThickness?: number
    };
}

type BarData = { 
    data: number[]
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
}


export interface PieOptionsConfig {
    config: {
        cutoutPercentage,
        rotation,
        circumference,
    };
}


type PieData = {
    data: number[]
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
}

export interface DataSetConfig {
    config:  LineData[] | PieData[] | BarData[];
}
