import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export const list = [
    {
        path:'/practice/index',
        mode:'practice',
        title:'Practice mode',
        title_cn:'模考练习',
        desc:'32 simulation questions, check your ability',
        desc_cn: '32道模拟题，90分及格哦',
        backgroundColor: '#F682A3'
    },
    {
        path:'/practice/index',
        mode:'feedback',
        title:'Feedback mode',
        title_cn:'随机练习',
        desc:'32 questions exercises, and get feedback',
        desc_cn: '随机提取32道题目练习，不会的可以看答案哦',
        backgroundColor: '#42A2F9'
    },
    // {
    //     path:'/practice/index',
    //     mode:'mistake',
    //     title:'Mistakes',
    //     title_cn:'错题集',
    //     desc:'Show the mistakes',
    //     desc_cn: '练习错误题',
    //     backgroundColor: '#eeb51e'
    // }
]

export const rulesList = [
    {
        path:'/help/vic',
        state:'vic',
        title:'Victoria',
        title_cn:'维洲驾考流程',
        backgroundColor: '#F67059'
    },
    {
        path:'/help/nsw',
        state:'nsw',
        title:'Victoria',
        title_cn:'新州驾考流程',
        backgroundColor: '#B38CFF'
    },
    // {
    //     path:'/help/sa',
    //     state:'sa',
    //     title:'South Australia',
    //     title_cn:'南澳驾考流程',
    //     backgroundColor: '#49D9CD'
    // }
]

class Practice extends Component{

    renderMenu(){
		return (
            <div className="menu-sub">
                <div className="menu-title">
                    <p>理论考试练习</p>
                </div>
                {list.map(v=>{
                    return  (
                        <div className="menu-list" key={v.mode}>
                            <Link to={{pathname:v.path, data:v}} >
                                <div className="menu-content" style={{backgroundColor:v.backgroundColor}} key={v.path} >
                                    <div className="menu-content-image">
                                        <img style={{height:'55px', width:'55px'}} src="https://image.flaticon.com/icons/svg/741/741414.svg"  alt="car" />
                                    </div>
                                    <div className="menu-content-right">
                                        <p className="menu-content-title">{v.title_cn}</p>
                                        <p className="menu-content-desc">{v.desc_cn}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        
                    )
                })}
            </div>
        )
    }
    
    renderRulesMenu(){
		return (
            <div className="menu-sub rules">
                <div className="menu-title">
                    <p>驾考流程</p>
                </div>
                {rulesList.map(v=>{
                    return(
                        <div className="menu-list"  key={v.state}>
                            <Link to={{pathname:v.path, data:v}}>
                                <div className="menu-content" style={{backgroundColor:v.backgroundColor}} key={v.path} >
                                    <div className="menu-content-image">
                                        <img style={{height:'55px', width:'55px'}} src="https://image.flaticon.com/icons/svg/741/741414.svg"  alt="car" />
                                    </div>
                                    <div className="menu-content-right">
                                        <p style={{paddingTop:'unset'}} className="menu-content-title">{v.title_cn}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ) 
                })}
            </div>
        )
	}

    render(){
        return (
            <div className="menu">
                {this.renderMenu()}
                {this.renderRulesMenu()}
            </div>
        )
    }
}

export default Practice