import React, {Component} from 'react'
import {WhiteSpace} from 'antd-mobile'
import {Switch, Route, Redirect} from 'react-router-dom'
// import CustTabBar from '../component/Tabbar/tabbar'

import Practice from '../container/practice/practice'
import Discover from '../container/discover/discover'
import About from '../container/about/about'
import CustNavBar from '../component/navbar/navbar'
const tabList = [
	{
		path:'/practice',
		text:'Practice',
		icon:'practice',
		title:'KaoZuo',
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

class Index extends Component{
    render(){
		document.title = 'KaoZuo - 澳洲中文驾考在线练习';
        const {pathname} = this.props.location
		const navPath = tabList.find(v=>v.path===pathname)
		
        return navPath ? (
            <div>
				<CustNavBar 
					data={{
						title:navPath.title,
						icon:'', 
						onLeftClick:''
					}} 
				/>
				<WhiteSpace/>
						<Switch>
							{tabList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
                            ))}
						</Switch>
				{/* <CustTabBar data={tabList}></CustTabBar> */}
			</div>
        ) : <Redirect to='/practice'></Redirect> 
    }
}

export default Index