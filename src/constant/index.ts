export interface DataEntry {
    x: number
    y: number
}

export interface SimpleChartLineChildProps {
    dataEntry: DataEntry[];
    color: ColorCode
}

export type ColorCode = `#${string}`