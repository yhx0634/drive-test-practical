import React, {Component} from 'react'
import {NavBar, Icon} from 'antd-mobile'

class CustNavBar extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const navTitle = this.props.data
        const content = navTitle.onLeftClick ? 
            (<NavBar 
                mode="dark"
                className='custNavBar'
                icon={navTitle.icon}
                onLeftClick={() => navTitle.onLeftClick()}
            >
                {navTitle.title}
            </NavBar>)
            :
            (<NavBar 
                mode="dark"
                className='custNavBar'
            >
                {navTitle.title}
            </NavBar>)

        return (
           content
        )
    }
}

export default CustNavBar
