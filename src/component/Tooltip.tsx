import React from 'react';
import { Group, Rect, Text, Arrow } from 'react-konva';
import { ColorCode } from '../constant';

interface TooltipProps {
  x: number;
  y: number;
  color: ColorCode;
  dataX: number;
  dataY: number;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, color, dataX, dataY }) => {
  const width = (`${dataX} / ${dataY}`).length * 6 + 20; // 吹き出しの幅を計算する

  return (
    <Group x={x} y={y}>
      <Rect
        width={width}
        height={26}
        fill="#f9f9f9"
        stroke={color}
        strokeWidth={1}
      />
      <Text
        x={10}
        y={6}
        text={`${dataX} / ${dataY}`}
        fontSize={14}
        fontFamily="Arial"
        fill="#333"
      />
    </Group>
  );
};

export default Tooltip;