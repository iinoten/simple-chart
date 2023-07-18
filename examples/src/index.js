import React from 'react';
import { render } from 'react-dom'
import SimpleChart from '../../src';
import { SimpleChartLine } from '../../src/SimpleChartLine';
// 開発用に使うデモの値
const VALUE_DEMO = [{x:0,y:0},{x:0.3,y:80},{x:0.5,y:23},{x:0.7,y:7},{x:2,y:0}]
const VALUE_DEMO_1 = [{x:0,y:10},{x:0.4,y:90},{x:0.7,y:53},{x:0.92,y:30},{x:2,y:200}]
const VALUE_DEMO_2 = [{x:0,y:30},{x:0.4,y:100},{x:0.7,y:83},{x:0.92,y:60},{x:2,y:100}]
const VALUE_DEMO_3 = [{x:0,y:60},{x:0.4,y:0},{x:0.7,y:93},{x:0.92,y:90},{x:2,y:300}]

const App = () => <>
<div className='main'>
<SimpleChart>
    <SimpleChartLine dataEntry={VALUE_DEMO} color='#555500' title='グラフA' />
    <SimpleChartLine dataEntry={VALUE_DEMO_1} color='#00ff00' title='グラフB' />
    <SimpleChartLine dataEntry={VALUE_DEMO_2}  title='グラフC' />
    <SimpleChartLine dataEntry={VALUE_DEMO_3}  title='グラフD' />
</SimpleChart>
</div>
</>
render(<App />, document.getElementById('root'));