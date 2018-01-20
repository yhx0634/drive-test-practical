import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css'

import Practice from './container/practice/practice'
import Discover from './container/discover/discover'
import About from './container/about/about'
import Index from './container/index/index'
import MockIncorrect from './component/mock/mock.incorrect'

import PracticeIndex from './component/practice/index'

ReactDOM.render(
    <BrowserRouter>
        <div style={{position:"fixed", height:"100%", width:"100%"}}>
            <Switch>
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
