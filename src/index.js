import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Router from './router'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css'

import Practice from './container/practice/practice'
import Discover from './container/discover/discover'
import About from './container/about/about'
import Index from './container/index/index'

import MockIndex from './component/mock/mock.index'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                {/* <Route  path='/discover' component={Discover}></Route>
                <Route  path='/about' component={About}></Route>
                <Route  path='/practice' component={Practice}></Route> */}
                <Route  path='/practice/mock' component={MockIndex}></Route>
                <Route component={Index}></Route>
            </Switch>
        </div>
    </BrowserRouter>
    , 
document.getElementById('root'))
