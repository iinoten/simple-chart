import React from 'react';
import { Group, Rect, Text, Arrow, Circle } from 'react-konva';
import { ColorCode } from '../constant';

interface ChartPointProps {
  x: number;
  y: number;
  color: ColorCode
}

const ChartPoint: React.FC<ChartPointProps> = ({ x, y, color }) => {

  return (
    <Circle
        fill='white' 
        x={x} y={y} 
        radius={6} 
        stroke={color} 
        strokeWidth={3}
        onMouseEnter={()=>console.log('on mouse enter')}
        onMouseOut={()=>console.log('on mouse out')}
    />
  );
};

export default ChartPoint;