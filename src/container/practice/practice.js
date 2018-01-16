import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Result, Icon, WhiteSpace, Flex } from 'antd-mobile';

class Practice extends Component{
 
    render(){
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

        const list = [
			{
				path:'/practice/mock',
                title:'Practice mode',
                title_cn:'模考练习',
                desc:'32 simulation questions, check your ability',
                desc_cn: '32道模拟题，看看你能答对几题吧'
            },
            {
				path:'/practice/random',
                title:'Feedback mode',
                title_cn:'随机练习',
                desc:'32 questions exercises, you can see the answer',
                desc_cn: '随机提取32道题目练习，不会的可以看答案哦'
            }
        ]
        return (
            <div>
                {
                    list.map(v=>(
                            <Link to={{pathname:v.path, data:v}} key={v.path}>
                            {/* <div className=""> */}
                                <Result 
                                    title={v.title}
                                    message={v.desc}
                                />
                            {/* </div> */}
                        </Link>
                    ))
                }
               
                
{/*                 
                <Link to="/practice/mock">
                    <div className="result-example">
                        <Result 
                            title="模考练习"
                            message="32道模拟题，看看你能答对几题吧"
                        />
                    </div>
                </Link>
                <Link to="/about"> 
                    <div className="result-example">
                        <Result 
                            title="随机练习"
                            message="随机提取32道题目练习，不会的可以看答案哦"
                        />
                    </div>
                </Link> */}
            </div>
        )
    }
}

export default Practice