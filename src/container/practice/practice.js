import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Result } from 'antd-mobile';

export const list = [
    {
        path:'/practice/index',
        mode:'practice',
        title:'Practice mode',
        title_cn:'模考练习',
        desc:'32 simulation questions, check your ability',
        desc_cn: '32道模拟题，看看你能答对几题吧'
    },
    {
        path:'/practice/index',
        mode:'feedback',
        title:'Feedback mode',
        title_cn:'随机练习',
        desc:'32 questions exercises, and get feedback',
        desc_cn: '随机提取32道题目练习，不会的可以看答案哦'
    }
]

class Practice extends Component{
 
    render(){
        return (
            <div>
                {
                    list.map(v=>(
                            <Link to={{pathname:v.path, data:v}} key={v.mode}>
                            {/* <div className=""> */}
                                <Result 
                                    title={v.title}
                                    message={v.desc}
                                />
                            {/* </div> */}
                        </Link>
                    ))
                }
            </div>
        )
    }
}

export default Practice