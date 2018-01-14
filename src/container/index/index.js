import React, {Component} from 'react'
import {NavBar} from 'antd-mobile'
import {Switch, Route, Redirect} from 'react-router-dom'
import CustTabBar from '../../component/Tabbar/tabbar'

import Practice from '../../container/practice/practice'
import Discover from '../../container/discover/discover'
import About from '../../container/about/about'
import NotFound from '../../component/404/404'


class Index extends Component{
    render(){
        const {pathname} = this.props.location
		const tabList = [
			{
				path:'/practice',
				text:'Practice',
				icon:'practice',
				title:'KAOZUO',
				component:Practice
			},
			{
				path:'/discover',
				text:'Discover',
				icon:'discover',
				title:'Discover',
				component:Discover
			},
			{
				path:'/about',
				text:'About',
				icon:'about',
                title:'About',
                component:About
            }
        ]

        const navPath = tabList.find(v=>v.path===pathname)
       
        return navPath ? (
            <div>
				<NavBar className='fixd-header' mode='light'>{navPath.title}</NavBar>
				<div style={{marginTop:45}}>
						<Switch>
							{tabList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
                            ))}
						</Switch>
				</div>
				<CustTabBar data={tabList}></CustTabBar>
			</div>
        ) : <Redirect to='/practice'></Redirect> 
    }
}

export default Index