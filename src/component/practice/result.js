import React from 'react'
import { Result, WhiteSpace, List } from 'antd-mobile';
import { Link } from 'react-router-dom'
import GoodImg from '../images/good.svg'
import FaceBad from '../images/face-bad.svg'
import { list } from '../../container/practice/practice'
const Item = List.Item;

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
const path = '/practice/incorrect'
class PracticeResult extends React.Component{
    
    calculate(data){
        const result = (data.answered.length - data.incorrect.length)/data.answered.length
        return Math.round(result*100)
    }

    getImg(e){
        let imgName
        e >= 90?
        imgName = GoodImg
        :
        imgName = FaceBad
        return imgName
    }

    getIncorrect(v, data){
        const question = data.quesData.find(d=>d._id===v.id)
        const _title = data.language ? question ? question.data.cn.question : question.data.en.question : null;
        
        const itemList =
            <Link  key={question._id}  to={{pathname:path, current:v, data:data}} >
                <Item 
                    arrow="horizontal"
                    onClick={() => {}}>
                        {_title}
                </Item>
            </Link>
        return itemList
    }
    
    render(){
        const data = this.props.data
        const backPath = '/practice'
        const resultExample = () => {
            if(this.props.mode === 'feedback'){
                return (
                    <div className="result-example">
                            <Result
                                img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
                                title='You have finished one group questions. Continue to practice？'
                                message={<div></div>}
                            >
                            </Result>
                            <WhiteSpace />
                       
                    <Link to={{pathname:list[1].path, data:list[1]}}>
                        <button className="am-button am-button-primary" style={{width:'100%', borderRadius: '0px'}}>Continue</button>
                    </Link>
                    <WhiteSpace />
                    <Link to={{pathname:backPath, data:list[1]}}>
                        <button className="am-button am-button-default" style={{width:'100%', borderRadius: '0px'}}>Done</button>
                    </Link>
                    </div>
                )
            } else {
                return(
                    <div>
                        <div className="result-example">
                        <div className="sub-title">Result</div>
                            <Result
                                className="result-score"
                                img={myImg(this.getImg(this.calculate(data)))}
                                title={'Your score is '+this.calculate(data)}
                                message={<div></div>}
                            >
                            </Result>
                            <WhiteSpace />
                        </div>
                        <div>
                        {
                            data.incorrect.length?
                            <List 
                                renderHeader={() => 'Incorrect'} 
                                className="my-list">
                                {data.incorrect.map(v=>{
                                    return(
                                        this.getIncorrect(v, data)
                                    )
                                })}
                                
                            </List>
                            :
                            null
                        }
                        </div>
                    </div>
                )
            }
        }
        
        return  resultExample()
    }
}

export default PracticeResult