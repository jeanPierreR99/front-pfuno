import React from 'react';
import Routes from './components/routes/Routes'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/client/Header'
const App = () => (
  <BrowserRouter>
    <div className='App app'>
      <Header></Header>
       <Routes></Routes>
    </div> 
  </BrowserRouter>
);

export default App;