import React from 'react';
import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";
import './styles.css';

// 開発用に使うデモの値
const VALUE_DEMO = [[0,0],[0.3,80],[0.5,23],[0.55,7],[1,50]]

const SimpleChart = () => {
    let biggistValIndex = 0;
    for (let index = 0; index < VALUE_DEMO.length; index++) {
        if (VALUE_DEMO[biggistValIndex][1] < VALUE_DEMO[index][1]) biggistValIndex = index
    }
    // 10,400 始まり   790,10 終わり
    // 780 全体横   390 全体縦
    let renderLineArr = []
    let renderPointArr = []

    for (let index = 0; index < VALUE_DEMO.length; index++) {
        renderLineArr[index*2] = VALUE_DEMO[index][0]*710+80
        renderLineArr[index*2+1] = 390 - VALUE_DEMO[index][1] / VALUE_DEMO[biggistValIndex][1] *390 + 10
        renderPointArr.push([VALUE_DEMO[index][0]*710+10+70, 390 - VALUE_DEMO[index][1] / VALUE_DEMO[biggistValIndex][1] *390 + 10])
    }

    const returnMemoryText = (index) => {
        if(index == 0) {
            console.log('000')
            return 0
        } else {
            console.log(`${VALUE_DEMO[biggistValIndex][1]}/${index} = ${VALUE_DEMO[biggistValIndex][1]/index}`)
            return VALUE_DEMO[biggistValIndex][1]/10*index
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
                            memoryLines.push(<Text x={71*index+80 -6 } y={420} fontSize={12} text={returnMemoryText(index)} />)
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
