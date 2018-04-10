import React from 'react';
import { Progress} from 'antd-mobile';
import PracticeResult from '../result/result';
import { getQuesList } from '../../../utils/getdata';
import {question_list} from '../../../Json/question.list';
import loadingImg from '../../images/loading.svg';
import imageIcon from '../../images/image.png';

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
            error: null,
            imageLoading:true
		}
    }

    componentWillMount() {
        document.title = '模考练习 - KaoZuo澳洲中文驾考在线练习';
        getQuesList('random', '32').then(res=>{
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
            document.getElementById('image_1').style.visibility='hidden'
            this.setState({
                incorrect:[...this.state.incorrect, {id, c}],
                sortId: this.state.sortId + 1,
                answered: [...this.state.answered, id]
            })
           
        }, 200)
        :
        setTimeout(() => {
            document.getElementById('image_1').style.visibility='hidden'
            this.setState({
                sortId: this.state.sortId + 1,
                answered: [...this.state.answered, id]
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

    handleImageLoaded() {
        document.getElementById('image_1').style.visibility='unset'
    }
     
    handleImageErrored() {
        document.getElementById('image_1').innerHTML='图片载入失败'
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

    renderImage(v){
        return (
        <div className="img" id="image_2" style={{backgroundImage : `url(${imageIcon})`, backgroundSize:'100%', visibility:'unset'}}>
            <img 
            className="img"
            id="image_1"
            style={{visibility: 'hidden'}}
            src={v}
            onLoad={this.handleImageLoaded.bind(this)}
            onError={this.handleImageErrored.bind(this)}
            alt="question" 
        /></div>)
    }

    renderNoneImage(v){
        const viewportHeight = window.innerHeight;
        return (
            viewportHeight >= 550? 
            <img className="img" id="image_1" style={{visibility: 'hidden'}} alt="" />
            :
            <img id="image_1" alt="" />
        )
    }

    renderQues(){
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
                            {
                                _question.image_path?
                                this.renderImage(_question.image_path)
                                :
                                this.renderNoneImage()
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