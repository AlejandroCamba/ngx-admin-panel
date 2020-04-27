export class XAxisConfig {
    config: {
        xAxes: [
            {
                ticks: {
                    display: boolean
                },
                gridLines: {
                    //color: [''],
                    display: boolean
                },
            },
        ],
    };
}

export class YAxisConfig {
    config: {
        xAxes: [
            {
                ticks: {
                    display: boolean;
                };
                gridLines: {
                    //color: [''],
                    display: boolean;
                };
            }
        ];
    };
}

export class DataSetConfig {
    config: {
        label?: string;
        data: number[];
        backgroundColor?: string[];
        borderColor?: string[];
        borderWidth?: number;
    };
}
