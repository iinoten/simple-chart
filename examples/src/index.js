import React from 'react';
import { render } from 'react-dom'
import SimpleChart from '../../src';
import { SimpleChartLine } from '../../src/SimpleChartLine';

const App = () => <>
<SimpleChart>
    <SimpleChartLine value="dfefsf" />
</SimpleChart>
</>
render(<App />, document.getElementById('root'));