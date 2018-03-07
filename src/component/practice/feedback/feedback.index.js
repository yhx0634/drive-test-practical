import React from 'react';
import { Progress, } from 'antd-mobile';
import PracticeResult from '../result/result';
import { getQuesList } from '../../../utils/getdata';
import loadingImg from '../../images/loading.svg';
import {question_list} from '../../../Json/question.list';

var correctDivId = ''
class FeedbackIndex extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
            language:true,
            sortId:0,
            // answered:[],
            quesData: [],
            loading: true,
            error: null

		}
    }

    componentDidMount() {
        document.title = '随机练习 - KaoZuo澳洲中文驾考在线练习';
        getQuesList('random', '3').then(res=>{
            if(res.code === 0) {
                const quesData = res.data;
                this.setState({
                    quesData,
                    loading: false,
                    error: null
                });
            } else {
                this.setState({
                    quesData:question_list,
                    loading: false
                });
            }
        }).catch(err => {
            this.setState({
                loading: false,
                error: err
            });
        });
    }

    // reload the component
    componentWillReceiveProps(){
        this.setState({
            sortId: 0
        })
    }
   
    checkCorrect(id,c,a,divId){
        if(c!== a){
            var option = document.getElementById(divId);
            option.classList.add('animation-shake')
            setTimeout(()=>{option.classList.remove('animation-shake')}, 200);
        }
        else {
            document.getElementById(divId).style.backgroundColor = '#49D9CD';
            document.getElementById('next').focus();
            correctDivId = divId;
        }
    }

    convertOption(e){
        if(e === '0')
            return 'A'
        if(e === '1')
            return 'B'
        if(e === '2')
            return 'C'
    }

    onPrev(id){
        if(this.state.sortId === 1){
            document.getElementById('prev').style.visibility = 'hidden';
        }

        if(this.state.sortId !== this.state.quesData.length){
            document.getElementById('next-text').innerHTML = '下一题';
        }

        if(correctDivId){
            document.getElementById(correctDivId).style.backgroundColor = '#F67059'
        }

        this.setState({
            sortId: this.state.sortId - 1
        })
    }


    onNext(id){
        if(this.state.sortId > -1){
            document.getElementById('prev').style.visibility = 'unset';
        }

        if(this.state.sortId === this.state.quesData.length-2){
            document.getElementById('next-text').innerHTML = '结束';
        }

        if(correctDivId){
            document.getElementById(correctDivId).style.backgroundColor = '#F67059';
        }
        
        this.setState({
            sortId: this.state.sortId + 1,
            // answered: [...this.state.answered, id],
        })
    }

    renderProgress() {
        const percent = (this.state.sortId + 1)/ this.state.quesData.length * 100
        return <Progress percent={percent}/>
    }

    renderLoading() {
        return <div className="loadingImg"><img src={loadingImg} className="spe am-icon am-icon-md" alt="loading" /></div>
    }

    renderQues(){
        const viewportHeight = window.innerHeight;
        const _question = this.state.quesData[this.state.sortId]
        const _quesContent = _question? this.state.language ? _question.data.cn : _question.data.en : null;
        
        return (
            _quesContent?
            (
                <div className="text-align-left result-example">
                    {this.renderProgress()}
                    <div className="ques">
                    <div className="ques-content">
                        <div className="ques-content-title">
                            <p className="ques-title">{_quesContent.question}</p>
                        </div>
                        <div className="ques-content-image">
                            {_question.image_path?
                                <img className="img" src={_question.image_path}  alt="question" />
                                :
                                viewportHeight>=550? <img className="img" style={{visibility: 'hidden'}} alt="question" /> :null
                            }
                        </div>
                        {_quesContent.choice.map(v=>{
                            return  (
                                <div className="ques-options" id={v.option} key={v.option} >
                                    <p onClick={()=>{
                                        this.checkCorrect(_question._id, v.option, _quesContent.answer, v.option)
                                    }}
                                        className="ques-option">{this.convertOption(v.option) + '. ' + v.content}
                                    </p>
                                </div>
                           )
                        })}
                        <div className="ques-btn">
                            <div tabIndex="0" onClick={()=>{
                                this.onPrev(_question._id);
                            }} className="ques-options" id="prev" style={{minWidth:'72px',textAlign:'center', background:'#42A2F9', visibility:'hidden'}}><p className="ques-option">上一题</p></div>
                            <div tabIndex="1" onClick={()=>{
                                this.onNext(_question._id);
                            }} className="ques-options" id="next" style={{minWidth:'72px',textAlign:'center', background:'#42A2F9', visibility:'unset'}}><p id="next-text" className="ques-option">下一题</p></div>
                            
                        </div>
                    </div>
                    </div>
                </div>
            )
            : this.renderResultPage()
        )
    }

    renderResultPage(){
        return  <PracticeResult data={this.state}  mode={'feedback'}></PracticeResult>
    }

    render(){
        return (
            <div>
                {this.state.loading? this.renderLoading() : this.renderQues()}
            </div>
        )
    }
}

export default FeedbackIndex