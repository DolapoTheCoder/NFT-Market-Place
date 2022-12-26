import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MarketPlace from './components/MarketPlace';
import Profile from './components/Profile';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './reduxThings/store/store';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/marketplace" element={<MarketPlace/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
