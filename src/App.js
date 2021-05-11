import React from 'react';

import cn from 'classnames';
import s from './App.module.scss';
import './styles/main.css';

const App = () => {
  return <div className={cn(s.header, 'color')}>Initial</div>;
};

export default App;
