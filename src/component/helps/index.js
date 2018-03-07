import React from 'react'
import { Icon } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import HelpPage from './help'
import CustNavBar from '../../component/navbar/navbar'
import './helps.css'
class HelpIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quesId:1
        }
    }

    renderMenu(){
        const data = this.props.history.location.data
        const content = data =>  {
            if(data !== undefined){
                switch(data.state){
                    case 'vic':
                        return <HelpPage title={data.title_cn} state={'vic'} theme={'#F67059'}></HelpPage>
                    case 'nsw':
                        return <HelpPage title={data.title_cn} state={'nsw'} theme={'#B38CFF'}></HelpPage>
                    default:
                        return null;
                }
            }
        }
        return (
            !data
            ? 
                <Redirect to={'/practice'}></Redirect> 
            : 
            <div>
                <CustNavBar 
                    data={{
                        title:data.title_cn, 
                        icon:<Icon type="left" />, 
                        onLeftClick:this.props.history.goBack
                    }} 
                />
                {content(data)}
            </div>
        )
    }
    render(){
        return (
            <div>
                {this.renderMenu()}
            </div>
        )
    }
}

export default HelpIndex