import React from 'react';
import RouterURL from './RouterUrl/RouterUrl';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <div>
          <RouterURL></RouterURL>
        </div>
    </Router>
    </div>
  );
}

export default App;
