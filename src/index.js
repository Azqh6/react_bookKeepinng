import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './theme.css'
import { Provider } from 'react-redux';
import store from '@/store/index'
import router from '@/router/index'
import { RouterProvider } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
    </Provider>

);

