import React from 'react'
import { Result, Icon, WhiteSpace, List, Modal } from 'antd-mobile';
import { Redirect, Link } from 'react-router-dom'

import MockIncorrect from './mock.incorrect'
import {question_en} from '../../Json/Questions.en'
import GoodImg from './img/good.svg'
import FaceBad from './img/face-bad.svg'
const Item = List.Item;
const Brief = Item.Brief;

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

class MockResult extends React.Component{
    
    constructor(props) {
    super(props);
    this.state = {
        modal1: false,
        modal2: false,
    };
    }

    calculate(data){
        const result = (data.answered.length - data.incorrect.length)/data.answered.length
        return Math.round(result*100)
    }

    getImg(e){
        
        var imgName
        e >= 90?
        imgName = GoodImg
        :
        imgName = FaceBad
       console.log(GoodImg)
        return imgName
    }

    getIncorrect(v, data){
        const question = question_en.find(d=>d.id===v.id)
        const correctChoice = question.choice.find(j=>j.choice===question.answer)
        const incorrectChoice = question.choice.find(j=>j.choice===v.c)
      
        const path = '/practice/incorrect'
        const itemList =
            <Link  key={question.id}  to={{pathname:path, current:v, data:data}} >
                <Item 
                    arrow="horizontal"
                    onClick={() => {}}>
                        {question.question}
                        {/* <Brief><span className="red">{v.c}. {incorrectChoice.content}</span> -- Your answer</Brief>
                        <Brief><span className="green">{correctChoice.choice}. {correctChoice.content}</span> -- Correct answer</Brief> */}
                </Item>
            </Link>
        return itemList
    }
    render(){
        const data = this.props.data
        return (
            <div>
                <div className="result-example">
                <div className="sub-title">Result</div>
                    <Result
                        className="result-score"
                        img={myImg(this.getImg(this.calculate(data)))}
                        title={'Your score is '+this.calculate(data)}
                        message={<div></div>}
                    />
                    <WhiteSpace />
                </div>
                <div>
                {console.log(data.incorrect)}
                {
                    
                    data.incorrect.length?
                    <List 
                        renderHeader={() => 'Incorrect'} 
                        className="my-list">
                        {data.incorrect.map(v=>{
                            return(
                                this.getIncorrect(v, data)
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