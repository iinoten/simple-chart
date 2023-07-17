import React from 'react';
import { Group, Rect, Text, Arrow } from 'react-konva';
import { ColorCode } from '../constant';

interface TooltipProps {
  x: number;
  y: number;
  text: string;
  color: ColorCode;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, text, color }) => {
  const width = text.length * 14 + 20; // 吹き出しの幅を計算する

  return (
    <Group x={x} y={y}>
      <Rect
        width={width}
        height={30}
        fill="#f9f9f9"
        stroke={color}
        strokeWidth={1}
      />
      <Text
        x={10}
        y={6}
        text={text}
        fontSize={14}
        fontFamily="Arial"
        fill="#333"
      />
    </Group>
  );
};

export default Tooltip;