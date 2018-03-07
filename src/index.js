import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css'
import registerServiceWorker from './registerServiceWorker'
import Index from './container/index'
import PracticeIndex from './component/practice/index'
import HelpIndex from './component/helps/index'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route  path='/help/:state' component={HelpIndex}></Route>
                <Route  path='/practice/index' component={PracticeIndex}></Route>
                <Route component={Index}></Route>
            </Switch>
        </div>
    </BrowserRouter>
    , 
document.getElementById('root'));
registerServiceWorker();
