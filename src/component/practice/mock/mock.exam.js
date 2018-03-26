import React from 'react';
import { Progress} from 'antd-mobile';
import PracticeResult from '../result/result';
import { getQuesList } from '../../../utils/getdata';
import {question_list} from '../../../Json/question.list';
import loadingImg from '../../images/loading.svg';

class MockExam extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
            incorrect:[],
            quesId:1,
            sortId:0,
            answered:[],
            language:true,
            quesData: [],
            loading: true,
            error: null
		}
    }

    componentWillMount() {
        document.title = '模考练习 - KaoZuo澳洲中文驾考在线练习';
        getQuesList('random', '10').then(res=>{
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
    
    checkCorrect(id,c,a){
        c!==a?
        this.setPageState(id, 'incorrect',c)
        :
        this.setPageState(id)
    }

    setPageState(id, incorrect, c){
        incorrect ?
        setTimeout(() => {
            this.setState({
                incorrect:[...this.state.incorrect, {id, c}],
                sortId: this.state.sortId + 1,
                answered: [...this.state.answered, id],
          })
        }, 200)
        :
        setTimeout(() => {
            this.setState({
                sortId: this.state.sortId + 1,
                answered: [...this.state.answered, id],
          })
        }, 200)
    }
    convertOption(e){
        if(e === '0')
            return 'A'
        if(e === '1')
            return 'B'
        if(e === '2')
            return 'C'
    }

    renderProgress() {
        const percent = (this.state.sortId + 1)/ this.state.quesData.length * 100
        return <Progress percent={percent}/>
    }

    renderLoading() {
        return <div className="loadingImg"><img src={loadingImg} className="spe am-icon am-icon-md" alt="" /></div>
    }
    renderResultPage(){
        return  <PracticeResult data={this.state} mode={'mock'}></PracticeResult>
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
                                <div className="ques-options" key={v.option} >
                                    <p onClick={()=>{
                                        this.checkCorrect(_question._id, v.option, _quesContent.answer)
                                    }}
                                        className="ques-option">{this.convertOption(v.option) + '. ' + v.content}
                                    </p>
                                </div>
                           )
                        })} 
                    </div>
                    </div>
                </div>
            )
            : this.renderResultPage()
        )
    }

    
    render(){
        return (
            <div>
                {this.state.loading? this.renderLoading() : this.renderQues()}
            </div>
        )
    }
}

export default MockExam