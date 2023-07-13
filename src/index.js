import React from 'react';
import { Layer, Line, Rect, Stage } from "react-konva";
import './styles.css';

const SimpleChart = () => (
    <>
        <Stage width={800} height={450}>
            <Layer>
              <Rect stroke='black' strokeWidth={0.1} width={800} height={450} />
              <Line points={[10,10, 10,400, 790,400]}stroke='#696969' strokeWidth={3} />
            </Layer>
        </Stage>
    </>
);
export default SimpleChart;
