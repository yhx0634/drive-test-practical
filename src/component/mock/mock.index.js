import React from 'react'
import { NavBar, Icon, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import MockExam from './mock.exam'

class MockIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listData:[],
            quesId:1
		}
    }

    componentWillMount(){
        this.setState({
            listData:this.props.history.location.data
        })
    }

    nextQues(index){
        this.setState({
            quesId:this.state.quesId+1
        })

        console.log(this.state.quesId)
     
    }
    render(){
        return (
            <div>
                {   
                    // !this.state.listData 
                    // ? 
                    //     <Redirect to={'/practice'}></Redirect> 
                    // : 
                        <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                        rightContent={[
                            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                            <Icon key="1" type="ellipsis" />,
                        ]}
                        > MockExam
                        {/* {this.state.listData.title} */}
                        </NavBar>
                }
               
                    <MockExam quesId = {this.state.quesId}></MockExam>
            </div>
            )
    }
}

export default MockIndex