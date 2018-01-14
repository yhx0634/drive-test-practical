import React from 'react'
import { Result, Icon, WhiteSpace, List } from 'antd-mobile';
import { Redirect } from 'react-router-dom'

import {question_en} from '../../Json/Questions.en'
import GoodImg from './img/good.svg'
import FaceBad from './img/face-bad.svg'
const Item = List.Item;
const Brief = Item.Brief;

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

class MockResult extends React.Component{
    

    calculate(data){
        const result = (data.answered.length - data.incorrect.length)/data.answered.length
        return Math.round(result*100)
    }

    getIncorrect(v){
        const question = question_en.find(d=>d.id===v.id)
        const correctChoice = question.choice.find(j=>j.choice===question.answer)
        const incorrectChoice = question.choice.find(j=>j.choice===v.c)
        console.log(correctChoice)
        console.log(question)
        const itemList =
            <Item key={question.id} wrap multipleLine onClick={() => {}}>
                {question.id + '. ' + question.question}
                <Brief><span className="red">{v.c}. {incorrectChoice.content}</span> -- Your answer</Brief>
                
                <Brief><span className="green">{correctChoice.choice}. {correctChoice.content}</span> -- Correct answer</Brief>
            </Item>
        return itemList
    }
    render(){
        const data = this.props.data
        return (
            <div>
                <div className="result-example">
                <div className="sub-title">Result</div>
                    <Result
                        img={myImg(FaceBad)}
                        title={'Your result is '+this.calculate(data)}
                        message={<div></div>}
                    />
                    <WhiteSpace />
                </div>
                <div>
                {
                    data.incorrect?
                    <List renderHeader={() => 'Incorrect'} className="my-list">
                        {data.incorrect.map(v=>{
                            return(
                                this.getIncorrect(v)
                               
                            //     <Item key={v.id} wrap multipleLine onClick={() => {}}>
                            //     {v.id + '. ' + v.ques}
                            //     <Brief><span className="red">A. dadsadsd</span> -- Your answer</Brief>
                            //     <Brief><span className="green">A. dadsadsd</span> -- Correct answer</Brief>
                            // </Item>
                            )
                          })}
                           
                    </List>
                    :
                    null
                }
                </div>
                
            </div>
          )
    }
}

export default MockResult