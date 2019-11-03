import React from 'react';

import { Provider } from 'react-redux';

import store from './store';

import Routers from './routes';

import { BrowserRouter } from 'react-router-dom';

import './App.css';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </Provider>
    );
}

export default App;