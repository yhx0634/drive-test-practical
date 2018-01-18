import React from 'react'
import { List, Result, WhiteSpace, Toast } from 'antd-mobile';
import PracticeResult from '../result'

const Item = List.Item;
const locale = {
    prevText: 'Prev',
    nextText: 'Next',
};
class FeedbackIndex extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
            incorrect:[],
            quesId:1,
            answered:[],

		}
    }

    // reload the component
    componentWillReceiveProps(){
        this.setState({
            quesId: 1
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

    setPageState(id, incorrect, c){
        incorrect ?
        null
        :
            setTimeout(() => {
                this.setState({
                    quesId: this.state.quesId + 1,
                    answered: [...this.state.answered, id],
            })
            }, 500)
    }

    render(){
        const _question = this.props.quesData.find(v=>v.id===this.state.quesId)
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
       
        return _question?
            (
                <div className="text-align-left result-example">
                    <Result
                        className="exam-page-result"
                        imgUnderTitle
                        img={_question.data.img?myImg(_question.data.img):null}
                        style={{ textAlign: 'left', paddingTop: '10px', paddingBottom: '10px' }}
                        title={_question.data.question}
                    />
                    <WhiteSpace size="xl"></WhiteSpace>
                    <List>
                        {_question.data.choice.map(v=>{
                            return  (
                                <Item
                                    wrap 
                                    key={v.choice} 
                                    onClick={() => {
                                        this.checkCorrect(_question.data.id, v.choice, _question.data.answer)
                                        
                                }}>
                                    {v.choice + '. ' + v.content}
                                </Item>
                            )
                        })}
                    </List>
                </div>
            )
        :
            <PracticeResult data={this.state} mode = 'feedback'></PracticeResult> 
    }
}

export default FeedbackIndex