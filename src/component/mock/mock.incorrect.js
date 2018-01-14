import React from 'react'
import { NavBar, Icon, List, Result, WhiteSpace, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import {question_en} from '../../Json/Questions.en'
import MockResult from './mock.result'

const Item = List.Item;
const Brief = Item.Brief;

class MockIncorrect extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
            incorrect:[],
            quesId:1,
            answered:[]
		}
    }
    
    checkCorrect(id,a,c,q){
        a!==c?
        this.setPageState(id, 'incorrect',q)
        :
        this.setPageState(id)
    }

    setPageState(id, incorrect,ques){
        incorrect ?
        setTimeout(() => {
            this.setState({
                incorrect:[...this.state.incorrect, {id, ques}],
                quesId: this.state.quesId + 1,
                answered: [...this.state.answered, id],
          })
        }, 200)
        :
        setTimeout(() => {
            this.setState({
                quesId: this.state.quesId + 1,
                answered: [...this.state.answered, id],
          })
        }, 200)
    }

    render(){
        const question = question_en.find(v=>v.id===quesId)
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
       
        return question?(
            <div>
                <Result  
                    title={question.id+'. '+question.question}
                />
                <WhiteSpace size="xl"></WhiteSpace>
                <List>
                    {question.choice.map(v=>{
                        return  (
                            <Item
                                wrap 
                                key={v.choice} 
                                onClick={() => {
                                    this.checkCorrect(question.id, v.choice, question.answer, question.question)
                                    
                            }}>
                                {v.choice + '. ' + v.content}
                            </Item>
                        )
                    })}
                </List>
            </div>
            )
            :
            <MockResult data={this.state}></MockResult> 
          
    }
}

export default MockIncorrect