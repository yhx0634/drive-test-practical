import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css'

import Index from './container/index/index'
import MockIncorrect from './component/mock/mock.incorrect'

import TestPage from './container/test/test'

import PracticeIndex from './component/practice/index'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route  exact path='/test' component={TestPage}></Route> */}
                {/* <Route  path='/discover' component={Discover}></Route>
                <Route  path='/about' component={About}></Route>
                <Route  path='/practice' component={Practice}></Route> */}
                <Route  path='/practice/index' component={PracticeIndex}></Route>
                <Route  path='/practice/incorrect' exact component={MockIncorrect}></Route>
                <Route component={Index}></Route>
            </Switch>
        </div>
    </BrowserRouter>
    , 
document.getElementById('root'))
