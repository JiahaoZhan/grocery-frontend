import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux'
import { router } from './router';
import { store } from './redux';

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router = {router}/>
      </Provider>
    </div>
  );
}

export default App;
