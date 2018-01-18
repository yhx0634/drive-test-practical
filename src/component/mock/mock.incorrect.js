import React from 'react'
import { Icon, List, Result, WhiteSpace, Toast } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import {question_en} from '../../Json/Questions.en'

import CustNavBar from '../../component/navbar/navbar'

const Item = List.Item;
const locale = {
    prevText: 'Prev',
    nextText: 'Next',
};

class MockIncorrect extends React.Component{
    constructor(props) {
        super(props);
       
        if(this.props.location.current){
            this.state = {
                data: this.props.location.data,
                currentId: this.props.location.current.id,
            };
        }  else   return null
    }

    onPrev(e,c){
        const currentListId = e.map((v, index)=>{
            return (
                v.id === c?
                    index
                : null
            )
        })

       
        var nextQuesId = e[currentListId - 1]
        // console.log('本页题目id',c, '所在列表中的排序 ', currentListId, '上一题题目id', nextQuesId.id)

        if(currentListId !== 0)
            this.setState({  visibilityPrev:'none' })
        
        if(currentListId === 0)
            Toast.info('This is the first one', 1)
        else
            this.setState({  currentId:nextQuesId.id })
    }

    onNext(e,c){
        const currentListId = e.map((v, index)=>{
            return (
                v.id === c?
                    index
                : null
            )
        })
        var nextQuesId = e[currentListId + 1]

        
        currentListId < e.length - 1?
        this.setState({  currentId:nextQuesId.id })
        :
        Toast.info('This is the last question', 1)
    }

    styleSet(c,a){
        var style=''
        if(this.props.location.current.c === c)
            style = '#ff000040'
        else if(c === a)
                style = '#00800040'
        
            
           
        // {id: 3, c: "A"}c: "A"id: 3__proto__: Object
        return style
    }

    renderPage(){
       
        const quesId = this.state.currentId
        const question = question_en.find(v=>v.id===quesId)
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
       
        return(
            <div>  
                <div>
                    {/* <NavBar
                        className="custNavBar"
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                        > Incorrect</NavBar> */}
                    <CustNavBar 
                        data={{
                            title:'Incorrect', 
                            icon:<Icon type="left" />, 
                            onLeftClick:this.props.history.goBack
                        }} 
                    />
                <div className="text-align-left result-example">
                <div className="exam-sub-title">Question {question.id}</div>
                    <Result
                        className="exam-page-result"
                        imgUnderTitle
                        title={question.question}
                        img={question.img?myImg(question.img):null}
                    />
                </div>
                <WhiteSpace size="xl"></WhiteSpace>
                <List className="incorrect-list">
                    {question.choice.map(v=>{
                        return  (
                            
                            <div key={v.choice} >
                                <Item
                                    style={{backgroundColor:this.styleSet(v.choice, question.answer)}}
                                    wrap 
                                    onClick={() => {}}>
                                    {v.choice + '. ' + v.content}
                                </Item>
                            </div>
                            
                        )
                    })}
                </List>
                
                {/* <Pagination simple total={5} current={1} locale={locale} /> */}
            </div>
            <div className="btnBar">
                <p onClick={()=>{this.onPrev(this.state.data.incorrect, quesId)}}>{locale.prevText}</p>
                <p onClick={()=>{this.onNext(this.state.data.incorrect, quesId)}}>{locale.nextText}</p>
            </div>
        </div>
        )
    } 

    
    render(){
        return this.props.location.current
        ?    
            this.renderPage()
        :
            <Redirect to={'/practice'}></Redirect> 
                   
          
    }
}

export default MockIncorrect