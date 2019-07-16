import React from 'react';
import { Route } from "react-router-dom";
import Home from './Home';
import StoreDetail from '../src/pages/StoreDetail'
import Checkout from '../src/pages/Checkout'

const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/store/:storeId" component={StoreDetail} />
    <Route path="/checkout" component={Checkout} />
  </div>
);

export default App;
