import React from 'react'
import { Icon } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import MockExam from '../mock/mock.exam'
import FeedbackIndex from './feedback/feedback.index'
import {question_en} from '../../Json/Questions.en'
import CustNavBar from '../../component/navbar/navbar'


class PracticeIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quesId:1,
		}
    }

    randomQues(){
        let arr = []
        let quesList = []
        let listRange = 32
        listRange = question_en.length < 32 ? question_en.length : null

        for( let i=0; i < listRange;){
            let num = Math.round(Math.random()*(question_en.length-1)+1)
            let flag = true
            arr.find(v=>v.quesId===num)?
                flag = false
            :
                arr = [...arr, {'arrId': i+1, 'quesId':num}]
            flag = flag ? i++ : null 
        }
        arr.map(v=>{
            const question = question_en.find(d=>d.id===v.quesId)
            quesList = [...quesList, {'id':v.arrId, 'data':question}]
            return quesList
        })
        return quesList
    }

    render(){
        const list = this.props.history.location.data
        const content = list =>  {
            if(list.length !== 0){
              return  (
                list.mode === 'practice'?
                <MockExam quesId = {this.state.quesId}  quesData = {this.randomQues()}></MockExam>
                :
                <FeedbackIndex quesId = {this.state.quesId}  quesData = {this.randomQues()}></FeedbackIndex>
              )
            }
        }
        return (
           
            <div>
                {  
                    !list
                    ? 
                        <Redirect to={'/practice'}></Redirect> 
                    : 
                    <div>
                        {/* <NavBar
                        className="custNavBar"
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                        > {list.title}
                        </NavBar>  */}
                        <CustNavBar 
                            data={{
                                title:list.title, 
                                icon:<Icon type="left" />, 
                                onLeftClick:this.props.history.goBack
                            }} 
                        />
                        {content(list)}
                    </div>
                    
                }
            </div>
            )
    }
}

export default PracticeIndex