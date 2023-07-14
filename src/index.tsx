import React, { ReactElement, ReactNode } from 'react';
import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";
import { DataEntry } from './constant';
import './styles.css';
import {SimpleChartLine, ChildProps} from './SimpleChartLine';

// 開発用に使うデモの値
const VALUE_DEMO: DataEntry[] = [{x:0,y:0},{x:0.3,y:80},{x:0.5,y:23},{x:0.7,y:7},{x:2,y:50}]

interface LineChartProps {
    children: React.ReactElement<ChildProps> | React.ReactElement<ChildProps>[];
}

const SimpleChart: React.FC<LineChartProps> = ({ children }: {
    children?: ReactNode
}) => {
    let biggistValIndex = 0;
    let biggistMemoryIndex = 0;
    // 10,400 始まり   790,10 終わり
    // 780 全体横   390 全体縦
    let renderLineArr: number[] = []
    let renderPointArr: number[][] = []
    for (let o = 0; o < VALUE_DEMO.length; o++) {
        if (VALUE_DEMO[biggistMemoryIndex].x < VALUE_DEMO[o].x) biggistMemoryIndex = o
        if (VALUE_DEMO[biggistValIndex].y < VALUE_DEMO[o].y) biggistValIndex = o
    }
    for (let l = 0; l < VALUE_DEMO.length; l++) {
        renderLineArr[l*2] = VALUE_DEMO[l].x as number / (VALUE_DEMO[biggistMemoryIndex].x as number) *710+80
        renderLineArr[l*2+1] = 390 - VALUE_DEMO[l].y / VALUE_DEMO[biggistValIndex].y *390 + 10
        renderPointArr.push([VALUE_DEMO[l].x as number / (VALUE_DEMO[biggistMemoryIndex].x as number) *710+80, 390 - VALUE_DEMO[l].y / VALUE_DEMO[biggistValIndex].y*390 + 10])
    }

    const returnMemoryText = (index: number): string => {
        if(index == 0) {
            return '0'
        } else {
            return (VALUE_DEMO[biggistValIndex].y/10*index).toString()
        }
    }

    const returnVerticalMemoryText = (index: number): string => {
        if(index == 0) {
            return '0'
        } else {
            return  (Math.floor( ( VALUE_DEMO[biggistMemoryIndex].x as number /10*index ) * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 )).toString()
        }
    }

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
