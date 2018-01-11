import React, {Component} from 'react'
import {NavBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import CustTabBar from '../../component/Tabbar/tabbar'

import Practice from '../../container/practice/practice'
import Discover from '../../container/discover/discover'
import About from '../../container/about/about'

class Index extends Component{
    render(){
        const {pathname} = this.props.location
        console.log(pathname)
		const tabList = [
			{
				path:'/practice',
				text:'Practice',
				icon:'practice',
				title:'Practice',
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
        return (
            <div>
				<NavBar className='fixd-header' mode='dard'>{pathname!=='/' ? tabList.find(v=>v.path==pathname).title : null}</NavBar>
				<div style={{marginTop:45}}>
						<Switch>
							{tabList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>

				<CustTabBar data={tabList}></CustTabBar>
				
			</div>
        )
    }
}

export default Index