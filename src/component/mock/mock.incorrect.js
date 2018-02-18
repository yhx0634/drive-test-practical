import React from 'react'
import { Icon, List, Result, WhiteSpace } from 'antd-mobile';
import { Redirect } from 'react-router-dom'

import CustNavBar from '../../component/navbar/navbar'

const Item = List.Item;

class MockIncorrect extends React.Component{
    constructor(props) {
        super(props);
       
        if(this.props.location.current){
            this.state = {
                data: this.props.location.data,
                currentId: this.props.location.current.id,
                currentAns: this.props.location.current.c,
                visibilityPrev:true,
                visibilityNext:true
            };
        }  else   return null
    }

    onPrev(e,c){
        var currentListId=-1
        e.map((v, index)=>{
            return (
                v.id === c?
                currentListId = index
                : null
            )
        })
        
        var nextQuesId = e[currentListId - 1]
        // console.log('本页题目id',c, '所在列表中的排序 ', currentListId, '上一题题目id', nextQuesId.id)

        if(currentListId !== 0)
            this.setState({  visibilityPrev:'none' })
        
        if(currentListId === 0)
            return null
        else
            return this.setState({  currentId:nextQuesId.id, currentAns:nextQuesId.c })
    }

    onNext = (e,c) => {
        var currentListId=-1
        e.map((v, index)=>{
            return (
                v.id === c?
                    currentListId = index
                : null
            )
        })
        var nextQuesId = e[currentListId + 1]

        
        return currentListId < e.length - 1?
        this.setState({  currentId:nextQuesId.id, currentAns:nextQuesId.c })
        :
        null
    }

    visibilityBtn(type, incorrect, quesId){
        var currentListId=-1
        incorrect.map((v, index)=>{
            return (
                v.id === quesId?
                    currentListId = index
                : null
            )
        })
       
        const locale = {
            prevText: {
                'en':'Prev',
                'cn':'上一题'
            },
            nextText: {
                'en':'Next',
                'cn':'下一题'
            },
        };
        let btnText = ' '
        if(type === 'Prev'){
            if(this.state.data.language)
                btnText = locale.prevText.cn
            else 
                btnText = locale.prevText.en
            
            if(currentListId !== 0){
                return <p>{btnText}</p>
            } else {
                return <p className="hideBtn">{btnText}</p>
            }
        }
        if(type === 'Next'){
            if(this.state.data.language)
                btnText = locale.nextText.cn
            else 
                btnText = locale.nextText.en

            if(currentListId !== incorrect.length-1){    
                return <p>{btnText}</p>
            } else {
                return <p className="hideBtn">{btnText}</p>
            }
        } 
    }

    styleSet(c,a){
        console.log('c', c, 'a', a);
        var style=''
        if(this.state.currentAns === c)
            style = '#ff000040'
        else if(c === a)
                style = '#00800040'
        
        return style
    }

    convertOption(e){
        if(e === '0')
            return 'A'
        if(e === '1')
            return 'B'
        if(e === '2')
            return 'C'
    }

    renderPage(){
        
        const quesId = this.state.currentId
        console.log(this.state.data.quesData);
        const question = this.state.data.quesData.find(v=>v._id===quesId)
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
        const _quesContent = this.state.data.language ? question.data.cn : question.data.en;
        const _imgPath = question ? question.image_path : null;
        const _choice = question ? _quesContent.choice : null;
        const _answer = question ? _quesContent.answer : null;
        const _title = question ? _quesContent.question : null;
       
        return(
            <div>  
                <div>
                    <CustNavBar 
                        data={{
                            title:'Incorrect', 
                            icon:<Icon type="left" />, 
                            onLeftClick:this.props.history.goBack
                        }} 
                    />
                <div className="text-align-left result-example">
                <div className="exam-sub-title">Question {question.quesId}</div>
                    <Result
                        className="exam-page-result"
                        imgUnderTitle
                        title={_title}
                        img={_imgPath?myImg(_imgPath):null}
                    />
                </div>
                <WhiteSpace size="xl"></WhiteSpace>
                <List className="incorrect-list">
                    {_choice.map(v=>{
                        return  (
                            <div key={v._id} >
                                <Item
                                    style={{backgroundColor:this.styleSet(v.option, _answer)}}
                                    wrap 
                                    onClick={() => {}}>
                                    {this.convertOption(v.option) + '. ' + v.content}
                                </Item>
                            </div>
                            
                        )
                    })}
                </List>
            </div>
            <div className="btnBar">
                <div className="switchBtn" onClick={()=>{this.onPrev(this.state.data.incorrect, quesId)}}>{this.visibilityBtn('Prev', this.state.data.incorrect, quesId)}</div>
                <div className="switchBtn" onClick={()=>{this.onNext(this.state.data.incorrect, quesId)}}>{this.visibilityBtn('Next', this.state.data.incorrect, quesId)}</div>
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