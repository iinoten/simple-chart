import React, { ReactElement, ReactNode } from 'react';
import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";
import { DataEntry, SimpleChartLineChildProps } from './constant';
import './styles.css';
import {SimpleChartLine} from './SimpleChartLine';

// 開発用に使うデモの値
const childLineData: DataEntry[] = [{x:0,y:0},{x:0.3,y:80},{x:0.5,y:23},{x:0.7,y:7},{x:2,y:50}]

interface LineChartProps {
    children: React.ReactElement<SimpleChartLineChildProps> | React.ReactElement<SimpleChartLineChildProps>[];
}

const SimpleChart: React.FC<LineChartProps> = ({ children }: {
    children?: ReactNode
}) => {
    let childLineData: DataEntry[] = []
    if (React.isValidElement(children) && children.type === SimpleChartLine) {
        childLineData = children?.props.dataEntry as DataEntry[]
    }
    let biggistValIndex = 0;
    let biggistMemoryIndex = 0;
    // 10,400 始まり   790,10 終わり
    // 780 全体横   390 全体縦
    let renderLineArr: number[] = []
    let renderPointArr: number[][] = []
    for (let index = 0; index < childLineData.length; index++) {
        if (childLineData[biggistMemoryIndex].x < childLineData[index].x) biggistMemoryIndex = index
        if (childLineData[biggistValIndex].y < childLineData[index].y) biggistValIndex = index

        renderLineArr[index*2] = childLineData[index].x as number / (childLineData[biggistMemoryIndex].x as number) *710+80
        renderLineArr[index*2+1] = 390 - childLineData[index].y / childLineData[biggistValIndex].y *390 + 10
        renderPointArr.push([childLineData[index].x as number / (childLineData[biggistMemoryIndex].x as number) *710+80, 390 - childLineData[index].y / childLineData[biggistValIndex].y*390 + 10])
    }

    const returnMemoryText = (index: number): string => {
        if(index == 0) {
            return '0'
        } else {
            return (childLineData[biggistValIndex].y/10*index).toString()
        }
    }

    const returnVerticalMemoryText = (index: number): string => {
        if(index == 0) {
            return '0'
        } else {
            return  (Math.floor( ( childLineData[biggistMemoryIndex].x as number /10*index ) * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 )).toString()
        }
    }
    console.log(`## ${childLineData.map((item=>`${item.x}/${item.y}`))}`)

    return(
        <>
            <Stage width={900} height={450}>
                <Layer>
                  <Rect stroke='black' strokeWidth={0.1} width={850} height={450} />
                    {(() => {
                        const memoryLines: React.JSX.Element[] = []
                        for (let index = 0; index < 10; index++) {
                            memoryLines.push(<Line points={[80, 400-40*index, 790,400-40*index,]} radius={6} stroke='#696969' strokeWidth={1} />)
                        }
                        return memoryLines
                    })()}
                    {(() => {
                        const memoryLines: React.JSX.Element[] = []
                        for (let index = 0; index < 11; index++) {
                            memoryLines.push(<Text x={50} y={400-40*index} text={returnMemoryText(index)} />)
                        }
                        return memoryLines
                    })()}
                    {(() => {
                        const memoryLines: React.JSX.Element[] = []
                        for (let index = 0; index < 11; index++) {
                            memoryLines.push(<Text x={71*index+80 -6 } y={420} fontSize={12} text={returnVerticalMemoryText(index)} />)
                        }
                        return memoryLines
                    })()}
                  <Line points={renderLineArr}stroke='#696969' strokeWidth={3} />
                    {renderPointArr.map((item) => {
                        return (
                            <Circle fill='white' x={item[0]} y={item[1]} radius={6} stroke='#696969' strokeWidth={3} />   
                        );
                    })}
                </Layer>
            </Stage>
            {children}
        </>
    )
};
export default SimpleChart;
