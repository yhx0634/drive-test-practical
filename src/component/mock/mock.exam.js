import React from 'react';
import { Progress, List, Result, WhiteSpace } from 'antd-mobile';
import PracticeResult from '../../component/practice/result';
import { getQuesList } from '../../utils/getdata';
import {question_list} from '../../Json/question.list';
import loadingImg from '../images/loading.svg';

const Item = List.Item;

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

    componentDidMount() {
        // setTimeout(() => {
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
        // }, 50000)
        
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

    renderQues(){
        // const _question = this.state.quesData.find(v=>v.id===this.state.quesId);
        
        const _question2 = this.state.quesData[this.state.sortId]
        // const _quesContent = _question? this.state.language ? _question.data.data.cn : _question.data.data.en : null;
        const _quesContent2 = _question2? this.state.language ? _question2.data.cn : _question2.data.en : null;
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
        return (
            _quesContent2?
            (
                <div className="text-align-left result-example">
                    {this.renderProgress()}
                    <Result
                        className="exam-page-result"
                        imgUnderTitle
                        img={_question2.image_path?myImg(_question2.image_path):null}
                        style={{ textAlign: 'left', paddingTop: '10px', paddingBottom: '10px' }}
                        title={_quesContent2.question}
                    />
                    <WhiteSpace size="xl"></WhiteSpace>
                   
                    <List>
                        {_quesContent2.choice.map(v=>{
                            return  (
                                <Item
                                    wrap 
                                    key={v._id} 
                                    onClick={() => {
                                        this.checkCorrect(_question2._id, v.option, _quesContent2.answer)
                                    }}>
                                    {this.convertOption(v.option) + '. ' + v.content}
                                </Item>
                           )
                        })} 
                    </List>
                </div>
            )
            : this.renderResultPage()
        )
    }

    renderResultPage(){
        return  <PracticeResult data={this.state}></PracticeResult>
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