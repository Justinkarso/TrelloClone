import React from 'react';
import TodoApp from './components/TodoApp';
import styled from 'styled-components'

const App = styled(({className}) => {
  return (
    <div className={className}>
      <TodoApp/>
    </div>
  );
})`
  height: 100vh;
  background: #222;
`

export default App;
