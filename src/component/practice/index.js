import React from 'react'
import { Icon } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import MockExam from '../mock/mock.exam'
import FeedbackIndex from './feedback/feedback.index'
import CustNavBar from '../../component/navbar/navbar'


class PracticeIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quesId:1
        }
        this.mounted = false;
    }

    renderMenu(){
        const list = this.props.history.location.data
        const content = list =>  {
            if(list.length !== 0){
              return  (
                list.mode === 'practice'?
                <MockExam quesId = {this.state.quesId}></MockExam>
                :
                <FeedbackIndex quesId = {this.state.quesId}></FeedbackIndex>
              )
            }
        }
        return (
            !list
            ? 
                <Redirect to={'/practice'}></Redirect> 
            : 
            <div>
                <CustNavBar 
                    data={{
                        title:list.title, 
                        icon:<Icon type="left" />, 
                        onLeftClick:this.props.history.goBack
                    }} 
                />
                {content(list)}
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

export default PracticeIndex