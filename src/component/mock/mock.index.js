import React from 'react'
import { NavBar, Icon, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import MockExam from './mock.exam'
import {question_en} from '../../Json/Questions.en'

class MockIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // listData:[],
            quesId:1,
            // quesList:[]
		}
    }

    componentWillMount(){
        this.setState({
            listData:this.props.history.location.data
        })
    }

    nextQues(index){
        this.setState({
            quesId:this.state.quesId+1
        })
        console.log(this.state.quesId)
    }

    getQuesList(){
        // var randomList = new Array()
        // var quesList = new Array()

        // randomList = this.randomQues()
        // randomList.map(v=>{
        //     const question = question_en.find(d=>d.id===v.quesId)
        //     quesList = [...quesList, question]
        // })

        // console.log(quesList)
        
        
        
    }

    randomQues(){
        var arr = new Array()
        var quesList = new Array()
        var listRange = 32
        question_en.length < 32 ? listRange = question_en.length : null

        console.log('listRange length',listRange)
        for( var i=0; i < listRange;){
            var num = Math.round(Math.random()*(question_en.length-1)+1)
            var flag = true
            arr.find(v=>v.quesId===num)?
                flag = false
            :
                arr = [...arr, {'arrId': i+1, 'quesId':num}]
            flag? i++ : null 
        }
        arr.map(v=>{
            const question = question_en.find(d=>d.id===v.quesId)
            quesList = [...quesList, {'id':v.arrId, 'data':question}]
           
        })
        return quesList
    }

    

    render(){
        return (
            <div>
                {   
                    !this.state.listData 
                    ? 
                        <Redirect to={'/practice'}></Redirect> 
                    : 
                        <NavBar
                        className="custNavBar"
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                        > Practice
                        {/* {this.state.listData.title} */}
                        </NavBar>
                }
               
                    <MockExam quesId = {this.state.quesId}  quesData = {this.randomQues()}></MockExam>
            </div>
            )
    }
}

export default MockIndex