import React from 'react'
import { Link } from 'react-router-dom'
import carImg from '../../images/car.png';
const titleIcon = carImg

class PracticeResult extends React.Component{
    componentDidMount() {
        document.title = '得分 - KaoZuo澳洲中文驾考在线练习';
    }

    calculate(data){
        const result = (data.answered.length - data.incorrect.length)/data.answered.length
        return Math.round(result*100)
    }

    getIncorrect(incorrect, data){
        const question = data.quesData.find(d=>d._id===incorrect.id)
        const _title = data.language ? question ? question.data.cn.question : question.data.en.question : null;
        const _options = data.language ? question ? question.data.cn.choice : question.data.en.choice : null;
        const _answer = data.language ? question ? question.data.cn.answer : question.data.en.answer : null;
        
        const itemList =
            // <Link  key={question._id}  to={{pathname:path, current:v, data:data}} >
                <div className="incorrect-list-content">
                    <p tabIndex="0" className="title" id={question._id+"_title" } onClick={()=>{
                       this.handleShow(question._id)
                    }}>{_title}</p>
                    
                    <div tabIndex="0" id={question._id} style={{display:'none'}}>
                        <p className="title" id={question._id+"_title" } >{_title}</p>
                        {question.image_path?<div className="result-img"><img className="img" src={question.image_path}  alt="question" /></div> : null}
                        { 
                            _options.map((v, index)=>{
                                return <div key={index}> {this.renderOption(v, index, _answer, incorrect)}</div>
                            })
                        }
                        <div className="result-img" style={{backgroundColor:'#F1F1F1'}} onClick={()=>{
                        this.handleHidden(question._id)
                        }}>
                            <i className='iconfont'>&#xe6e2;</i>
                        </div>
                    </div>
                </div>
            // </Link>
        return itemList
    }

    handleHidden(id){
        const _id = id + "_title";
        document.getElementById(id).style.display="none";
        document.getElementById(_id).style.display="unset";
        document.getElementById(_id).focus();
    }

    handleShow(id){
        const _id = id + "_title";
        document.getElementById(id).style.display="unset";
        document.getElementById(_id).style.display="none";
        document.getElementById(id).focus();
    }

    renderOption(option, index, answer, incorrect){
        var choice = null
        switch(index){
            case 0:
                choice = 'A';
                break;
            case 1:
                choice = 'B';
                break;
            case 2:
                choice = 'C';
                break;
            default:
                return null;
        }
        if(option.option === answer)
            return <p className="title" style={{color:'green'}}>{choice + '. ' + option.content}</p>
        else 
            if(option.option === incorrect.c)
                return <p className="title" style={{color:'red'}}>{choice + '. ' + option.content}</p>
            else
                return <p className="title">{choice + '. ' + option.content}</p>
    }

    renderFeedback(){
        const list = [
            {
                path:'/practice/index',
                mode:'feedback',
                title:'Feedback mode',
                title_cn:'继续练习',
                desc:'32 questions exercises, and get feedback',
                desc_cn: '随机提取32道题目练习，不会的可以看答案哦',
                backgroundColor: '#42A2F9'
            },
            {
                path:'/practice/index',
                mode:'practice',
                title:'Practice mode',
                title_cn:'模考练习',
                desc:'32 simulation questions, check your ability',
                desc_cn: '32道模拟题，90分及格哦',
                backgroundColor: '#F682A3'
            },
            {
                path:'/practice',
                mode:'feedback',
                title:'Feedback mode',
                title_cn:'返回',
                desc:'32 questions exercises, and get feedback',
                desc_cn: '随机提取32道题目练习，不会的可以看答案哦',
                backgroundColor: '#49D9CD'
            },
        ]

        
            const feedback =  
                <div className="menu-list result-feedback">
                    {list.map(v=>{
                        return <Link to={{pathname:v.path, data:v}} key={v.mode}>
                            <div className="menu-content" style={{backgroundColor:v.backgroundColor}} key={v.title} >
                                <div className="menu-content-image">
                                    <img style={{height:'55px', width:'55px'}} src={titleIcon}  alt="car" />
                                </div>
                                <div className="menu-content-right">
                                    <p className="menu-content-title">{v.title_cn}</p>
                                </div>
                            </div>
                        </Link>
                    })}
                </div>
            
            return feedback
    }
    resultExample() {
        const data = this.props.data;
        if(this.props.mode === 'feedback'){
            return <div className="menu">{this.renderFeedback()}</div>
        } else {
            const score = this.calculate(data);
            return(
                <div>
                    <div className="result" style={score>=90? {backgroundColor:'#49D9CD'}: {backgroundColor:'tomato'}}>
                        <p className="">得分</p>
                        <p className="result-scores">{score}</p>
                    </div>
                    <div>
                    {
                        data.incorrect.length?
                        <div className="incorrect-list">
                            <div className="incorrect-title">
                                <p style={{margin:0}}>错题</p>
                            </div>
                            {data.incorrect.map(v=>{
                                return <div key={v.id}>{this.getIncorrect(v, data)}</div>
                            })}
                        </div>
                        :
                        null
                    }
                    </div>
                </div>
            )
        }
    }
    
    render(){
        return  this.resultExample()
    }
}

export default PracticeResult