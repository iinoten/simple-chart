import React from 'react';
import { Layer, Line, Rect, Stage } from "react-konva";
import './styles.css';

// 開発用に使うデモの値
const VALUE_DEMO = [[0,0],[0.3,0.6],[0.5,0.3],[0.55,0.7],[1,0.5]]

const SimpleChart = () => {
    let biggistValIndex = 0;
    for (let index = 0; index < VALUE_DEMO.length; index++) {
        if (VALUE_DEMO[biggistValIndex][1] < VALUE_DEMO[index][1]) biggistValIndex = index
    }
    // 10,400 始まり   790,10 終わり
    // 780 全体横   390 全体縦
    let renderLineArr = []

    for (let index = 0; index < VALUE_DEMO.length; index++) {
        renderLineArr[index*2] = VALUE_DEMO[index][0]*780+10
        renderLineArr[index*2+1] = 390 - VALUE_DEMO[index][1]*390 + 10
    }

    return(
        <>
            <Stage width={800} height={450}>
                <Layer>
                  <Rect stroke='black' strokeWidth={0.1} width={800} height={450} />
                  <Line points={[10,10, 10,400, 790,400]}stroke='#696969' strokeWidth={3} />
                  <Line points={renderLineArr}stroke='#696969' strokeWidth={3} />
                </Layer>
            </Stage>
        </>
    )
};
export default SimpleChart;
