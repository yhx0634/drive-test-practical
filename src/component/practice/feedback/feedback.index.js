import React from 'react';
import { Progress, List, Result, WhiteSpace, Toast } from 'antd-mobile';
import PracticeResult from '../result';
import { getQuesList } from '../../../utils/getdata';
import loadingImg from '../../images/loading.svg';
import {question_list} from '../../../Json/question.list';

const Item = List.Item;

class FeedbackIndex extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
            incorrect:[],
            quesId:1,
            sortId:0,
            answered:[],
            quesData: [],
            loading: true,
            error: null

		}
    }

    componentDidMount() {
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
    // reload the component
    componentWillReceiveProps(){
        this.setState({
            sortId: 0
        })
    }
    
    checkCorrect(id,c,a){
        if(c!== a)
            Toast.offline('Incorrect!!!', 0.5)
        else{
            Toast.success('Correct !!!', 0.5);
            this.setPageState(id)
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

    setPageState(id, incorrect, c){
        const result = incorrect ?
            null
        :
            setTimeout(() => {
                this.setState({
                    sortId: this.state.sortId + 1,
                    answered: [...this.state.answered, id],
            })
            }, 500)

        return result
    }

    renderProgress() {
        const percent = (this.state.sortId + 1)/ this.state.quesData.length * 100
        return <Progress percent={percent}/>
    }

    renderLoading() {
        return <div className="loadingImg"><img src={loadingImg} className="spe am-icon am-icon-md" alt="" /></div>
    }

    renderQues() {
        const _question = this.state.quesData[this.state.sortId];
        const _quesContent = _question? this.state.language ? _question.data.cn : _question.data.en : null;
        
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
        return (
            _question?
                (
                    <div className="text-align-left result-example">
                        {this.renderProgress()}
                        <Result
                            className="exam-page-result"
                            imgUnderTitle
                            img={_question.image_path?myImg(_question.image_path):null}
                            style={{ textAlign: 'left', paddingTop: '10px', paddingBottom: '10px' }}
                            title={_quesContent.question}
                        />
                        <WhiteSpace size="xl"></WhiteSpace>
                        <List>
                            {_quesContent.choice.map(v=>{
                                return  (
                                    <Item
                                        wrap 
                                        key={v._id} 
                                        onClick={() => {
                                            this.checkCorrect(_question._id, v.option, _quesContent.answer)
                                            
                                    }}>
                                        {this.convertOption(v.option) + '. ' + v.content}
                                    </Item>
                                )
                            })}
                        </List>
                    </div>
                )
            :
                <PracticeResult data={this.state} mode = 'feedback'></PracticeResult> 
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

export default FeedbackIndex