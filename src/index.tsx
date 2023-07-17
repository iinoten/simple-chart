import React, { ReactElement, isValidElement, ReactNode,Children  } from 'react';
import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";
import { ColorCode, DataEntry, SimpleChartLineChildProps, preColors } from './constant';
import './styles.css';
import {SimpleChartLine} from './SimpleChartLine';

interface LineChartProps {
    children: React.ReactElement<SimpleChartLineChildProps> | React.ReactElement<SimpleChartLineChildProps>[];
}

const isReactElement = (child: ReactNode): child is ReactElement<SimpleChartLineChildProps> => {
    return (
      typeof child === 'object' &&
      child !== null &&
      'props' in child &&
      (child as ReactElement<SimpleChartLineChildProps>).type !== undefined &&
      (child as ReactElement<SimpleChartLineChildProps>).props !== undefined
    );
  };

const SimpleChart: React.FC<LineChartProps> = ({ children }: {
    children?: ReactNode
}) => {
    // 子要素のDataEntryデータを二次元配列に格納
    const childPropsArray: DataEntry[][] = Children.toArray(children).map((child: ReactNode) => {
        if (!isReactElement(child)) return [];
    
        const childElement = child as ReactElement<SimpleChartLineChildProps>;
        const childProps = childElement.props.dataEntry;
        return childProps;
    }) as DataEntry[][];
    const colorsArray: ColorCode[] = []
    // グラフの色配列
    const lineColorDatas: ColorCode[] = Children.toArray(children).map((child: ReactNode) => {
        if (!isReactElement(child)) return [];
        const childElement = child as ReactElement<SimpleChartLineChildProps>;
        const childProps = childElement.props.color;
        if(childProps === undefined) {
            colorsArray.push(preColors[colorsArray.length % preColors.length]);
            return preColors[colorsArray.length % preColors.length]
        }
            return childProps;
    }).filter((color): color is ColorCode => color !== null);

    // 折れ線グラフにするデータ群
    const childLineData: DataEntry[] = (()=>{
        if (React.isValidElement(children) && children.type === SimpleChartLine && !(children===null)) {
            const hoge = children as ReactElement<SimpleChartLineChildProps>
            return hoge.props.dataEntry as DataEntry[]
        } else {
            return []
        }
    })()

    // DataEntryデータのxの最大値
    const biggistXValue = Math.max(...childPropsArray.flatMap(innerArr => innerArr.map(obj => obj.x)));
    // DataEntryデータのyの最大値
    const biggistYValue = Math.max(...childPropsArray.flatMap(innerArr => innerArr.map(obj => obj.y)));

    // 10,400 始まり   790,10 終わり
    // 780 全体横   390 全体縦

    // 折れ線の描画位置に変換
    const renderLineArr: number[] =  childLineData.flatMap(obj => [
        (obj.x/(biggistXValue as number) *710+80), 
        (390 - obj.y/ biggistYValue *390 + 10)
    ]);

    const LinesPositionData = childPropsArray.map(dataEntryArr => {
        return dataEntryArr.flatMap(obj => [
            (obj.x/(biggistXValue as number) *710+80),   
            (390 - obj.y/ biggistYValue *390 + 10)
        ])
    })

    // 点描画位置に変換
    const renderPointArr: number[][][]= childPropsArray.map(dataEntry => (
        dataEntry.map((item, index) => [item.x / (biggistXValue) *710+80, 390 - item.y / biggistYValue*390 + 10])
    ))

    // 横軸の表記を出力
    const returnMemoryText = (index: number): string => {
        if(index == 0) {
            return '0'
        } else {
            return (biggistYValue/10*index).toString()
        }
    }

    // 縦軸の表記を出力
    const returnVerticalMemoryText = (index: number): string => {
        if(index == 0) {
            return '0'
        } else {
            return  (Math.floor( ( biggistXValue as number /10*index ) * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 )).toString()
        }
    }

    return(
        <>
        hoge
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
                    {
                        LinesPositionData.map((lineData,index) => (
                            <Line points={lineData} stroke={lineColorDatas[index]} strokeWidth={3} />
                        ))
                    }
                    {renderPointArr.map((pointArr,index) => {
                        return (
                            pointArr.map((item) => {
                                return <Circle fill='white' x={item[0]} y={item[1]} radius={6} stroke={lineColorDatas[index]} strokeWidth={3} />  
                            }) 
                        );
                    })}
                </Layer>
            </Stage>
        </>
    )
};
export default SimpleChart;
