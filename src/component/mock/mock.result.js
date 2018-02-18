import React from 'react'
import { Result, WhiteSpace, List } from 'antd-mobile';
import { Link } from 'react-router-dom'

import {question_en} from '../../Json/Questions.en'
import GoodImg from './img/good.svg'
import FaceBad from './img/face-bad.svg'
const Item = List.Item;

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

class MockResult extends React.Component{
    
    calculate(data){
        const result = (data.answered.length - data.incorrect.length)/data.answered.length
        return Math.round(result*100)
    }

    getImg(e){
        let imgName
        e >= 90?
        imgName = GoodImg
        :
        imgName = FaceBad
        return imgName
    }

    getIncorrect(v, data){
        const question = question_en.find(d=>d.id===v.id)
      
        const path = '/practice/incorrect'
        const itemList =
            <Link  key={question.id}  quesData={this.props} to={{pathname:path, current:v, data:data}} >
                <Item 
                    arrow="horizontal"
                    onClick={() => {}}>
                        {question.question}
                </Item>
            </Link>
        return itemList
    }
    render(){
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