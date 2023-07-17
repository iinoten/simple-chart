export interface DataEntry {
    x: number
    y: number
}

export interface SimpleChartLineChildProps {
    dataEntry: DataEntry[];
    color: ColorCode;
    title: string;
}

export type ColorCode = `#${string}`

export const preColors:ColorCode[] = [
    '#ff4500',
    '#3cb371',
    '#1e90ff',
    '#6a5acd',
    '#ff1493',
    '#ff8c00',
    '#b22222',
    '#008b8b',
]