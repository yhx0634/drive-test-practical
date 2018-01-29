import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Result, List } from 'antd-mobile';

const Item = List.Item;

export const list = [
    {
        path:'/practice/index',
        mode:'practice',
        title:'Practice mode',
        title_cn:'模考练习',
        desc:'32 simulation questions, check your ability',
        desc_cn: '32道模拟题，看看你能答对几题吧',
        backgroundColor: '#c22132'
    },
    {
        path:'/practice/index',
        mode:'feedback',
        title:'Feedback mode',
        title_cn:'随机练习',
        desc:'32 questions exercises, and get feedback',
        desc_cn: '随机提取32道题目练习，不会的可以看答案哦',
        backgroundColor: '#82b546'
    },
    {
        path:'/practice/index',
        mode:'mistake',
        title:'Mistakes',
        title_cn:'错题集',
        desc:'Show the mistakes',
        desc_cn: '练习错误题',
        backgroundColor: '#eeb51e'
    }
]

class Practice extends Component{
 
    render(){
        return (
            <div>
                {
                    <List className="incorrect-list">
                        {list.map(v=>{
                            return  (
                                <Link to={{pathname:v.path, data:v}} key={v.mode}>
                                <div className="practice-list-item" key={v.path} >
                                    <Item
                                        wrap 
                                        onClick={() => {}}
                                        style={{backgroundColor:v.backgroundColor, height:"120px"}}>
                                       {v.title}
                                    </Item>
                                </div>
                                </Link>
                             
                            )
                         })}
                     </List>
                    // list.map(v=>(
                    //         <Link to={{pathname:v.path, data:v}} key={v.mode}>
                    //             <Result 
                    //                 title={v.title}
                    //                 message={v.desc}
                    //             />
                    //     </Link>
                    // ))
                }
            </div>
        )
    }
}

export default Practice