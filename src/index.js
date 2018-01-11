import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'antd-mobile/dist/antd-mobile.css'

import Index from './component/Practice/index'
import Mock from './component/Practice/mock'
import Random from './component/Practice/random'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                
                <Route path='/mock' component={Mock}></Route>
                <Route path='/random' component={Random}></Route>
                <Route component={Index}></Route>
            </Switch>
        </div>
    </BrowserRouter>, 
document.getElementById('root'))
