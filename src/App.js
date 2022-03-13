import './App.css';
import React from 'react';

import AutoComplete from './Components/auto';
import Clock from './Components/clock';
import Weather from './Components/weather';
import Tabs from './Components/tabs';

const names = [
  'Abba',
  'Barney',
  'Barbara',
  'Jeff',
  'Jenny',
  'Sarah',
  'Sally',
  'Xander'
];

const panes = [
  {title: 'one', content: 'I am the first'},
  {title: 'two', content: 'Second pane here'},
  {title: 'three', content: 'Third pane here'}
];

const App = () => (
  <div>
    <Clock />
    <Weather />
    <div className='interactive'>
      <Tabs panes={panes} />
      <AutoComplete names={names} />
    </div>
  </div>
)

export default App;
