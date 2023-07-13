import React from 'react';
import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";
import './styles.css';

// 開発用に使うデモの値
const VALUE_DEMO = [[0,0],[10,80],[60,23],[65,7],[120,50]]

const SimpleChart = () => {
    let biggistValIndex = 0;
    let biggistMemoryIndex = 0;
    for (let o = 0; o < VALUE_DEMO.length; o++) {
        if (VALUE_DEMO[biggistMemoryIndex][0] < VALUE_DEMO[o][0]) biggistMemoryIndex = o
        if (VALUE_DEMO[biggistValIndex][1] < VALUE_DEMO[o][1]) biggistValIndex = o
    }
    for (let o = 0; o < VALUE_DEMO.length; o++) {
        console.log(`${VALUE_DEMO[biggistMemoryIndex][0]} < ${VALUE_DEMO[o][0]}`)
    }
    // 10,400 始まり   790,10 終わり
    // 780 全体横   390 全体縦
    let renderLineArr = []
    let renderPointArr = []

    for (let l = 0; l < VALUE_DEMO.length; l++) {
        renderLineArr[l*2] = VALUE_DEMO[l][0] / VALUE_DEMO[biggistMemoryIndex][0] *710+80
        renderLineArr[l*2+1] = 390 - VALUE_DEMO[l][1] / VALUE_DEMO[biggistValIndex][1] *390 + 10
        renderPointArr.push([VALUE_DEMO[l][0] / VALUE_DEMO[biggistMemoryIndex][0] *710+80, 390 - VALUE_DEMO[l][1] / VALUE_DEMO[biggistValIndex][1] *390 + 10])
    }

    const returnMemoryText = (Mindex) => {
        if(Mindex == 0) {
            return 0
        } else {
            return VALUE_DEMO[biggistValIndex][1]/10*Mindex
        }
    }

    const returnVerticalMemoryText = (Vindex) => {
        if(Vindex == 0) {
            console.log('000')
            return 0
        } else {
            return  Math.floor( ( VALUE_DEMO[biggistMemoryIndex][0]/10*Vindex ) * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 )
        }
    }

    return(
        <>
            <Stage width={900} height={450}>
                <Layer>
                  <Rect stroke='black' strokeWidth={0.1} width={800} height={450} />
                    {(() => {
                        const memoryLines = []
                        for (let index = 0; index < 10; index++) {
                            memoryLines.push(<Line points={[80, 400-40*index, 790,400-40*index,]} radius={6} stroke='#696969' strokeWidth={1} />)
                        }
                        return memoryLines
                    })()}
                    {(() => {
                        const memoryLines = []
                        for (let index = 0; index < 11; index++) {
                            memoryLines.push(<Text x={0} y={400-40*index} text={returnMemoryText(index)} />)
                        }
                        return memoryLines
                    })()}
                    {(() => {
                        const memoryLines = []
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
        </>
    )
};
export default SimpleChart;
