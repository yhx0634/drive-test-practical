import React from 'react'
// import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter

class CustTabBar extends React.Component{
	// static propTypes = {
	// 	data: PropTypes.array.isRequired
	// }
	render(){
        const tabList = this.props.data
        const {pathname} = this.props.location
        console.log('dsassa')
        
		return (
			<TabBar tintColor="#36ab60">
				{tabList.map(v=>(
					<TabBar.Item
						key={v.path}
						title={v.text}
						icon={{uri: require(`./img/${v.icon}.png`)}}
						selectedIcon={{uri: require(`./img/${v.icon}_fill.png`)}}
                        selected={pathname===v.path}
						onPress={()=>{
							this.props.history.push(v.path)
						}}
					>
					</TabBar.Item>
				))}
			</TabBar>
		)
	}
}



export default CustTabBar