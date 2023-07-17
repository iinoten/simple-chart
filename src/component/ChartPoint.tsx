import React, { useState } from 'react';
import { Group, Rect, Text, Arrow, Circle, Stage, Layer } from 'react-konva';
import { ColorCode } from '../constant';
import Tooltip from './Tooltip';

interface ChartPointProps {
  x: number;
  y: number;
  color: ColorCode
}

const ChartPoint: React.FC<ChartPointProps> = ({ x, y, color }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const handleMouseEnter = (e: any) => {
        setShowTooltip(true);
        const { x, y } = e.target.absolutePosition();
        setTooltipPosition({ x, y });
        console.log('hoge')
      };
    
      const handleMouseLeave = () => {
        setShowTooltip(false);
      };
    return (
        <>
            <Circle
                fill='white' 
                x={x} y={y} 
                radius={6} 
                stroke={color} 
                strokeWidth={3}
                onMouseEnter={(e)=>handleMouseEnter(e)}
                onMouseOut={()=>handleMouseLeave()}
            />
            {showTooltip && (
                <Tooltip x={tooltipPosition.x} y={tooltipPosition.y} text="注釈" color={color} />
            )}
        </>
    );
};

export default ChartPoint;