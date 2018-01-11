import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Result, Icon, WhiteSpace } from 'antd-mobile';

class Practice extends Component{
 
    render(){
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
        return (
            <div>
                 <Link to="/discover">
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
                </Link>
            </div>
        )
    }
}

export default Practice