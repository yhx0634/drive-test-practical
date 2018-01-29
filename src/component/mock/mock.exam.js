import React from 'react'
import { List, Result, WhiteSpace } from 'antd-mobile';
import PracticeResult from '../../component/practice/result'

const Item = List.Item;

class MockExam extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
            incorrect:[],
            quesId:1,
            answered:[],

		}
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
                quesId: this.state.quesId + 1,
                answered: [...this.state.answered, id],
          })
        }, 200)
        :
        setTimeout(() => {
            this.setState({
                quesId: this.state.quesId + 1,
                answered: [...this.state.answered, id],
          })
        }, 200)
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
            <PracticeResult data={this.state}></PracticeResult> 
    }
}

export default MockExam