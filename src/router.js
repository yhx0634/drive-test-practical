import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Practice from './container/practice/practice'
import Discover from './container/discover/discover'
import About from './container/about/about'
import Index from './container/index/index'

class Router extends Component{
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        {/* <Route path='/discover' component={Discover}></Route>
                        <Route path='/about' component={About}></Route>
                        <Route path='/practice' component={Index}></Route> */}
                        <Route component={Index}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router