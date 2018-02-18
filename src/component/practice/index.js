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
    // randomQues2(){
    //     let arr = []
    //     let quesList = []
    //     let listRange = 32
    //     listRange = question_list.length < 32 ? question_list.length : null

    //     for( let i=0; i < listRange;){
    //         let num = Math.round(Math.random()*(question_list.length-1)+1)
    //         let flag = true
    //         arr.find(v=>v.quesId===num)?
    //             flag = false
    //         :
    //             arr = [...arr, {'arrId': i+1, 'quesId':num}]
    //         flag = flag ? i++ : null 
    //     }
    //     arr.map(v=>{
    //         const question = question_list.find(d=>d.quesId===v.quesId)
    //         quesList = [...quesList, {'id':v.arrId, 'data':question}]
    //         return quesList
    //     })
    //     return quesList
    // }

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