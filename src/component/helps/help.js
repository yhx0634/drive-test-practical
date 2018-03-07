import React, {Component} from 'react'
import {stateData } from './content';

class HelpPage extends Component{
    constructor(props) {
		super(props)
		this.state = {
           step:0,
           data:[]
		}
    }

    componentDidMount(){
        document.title = this.props.title + ' - KaoZuo澳洲中文驾考在线练习';
        if(this.props.state === 'vic'){
            this.setState({
                data: stateData.vic
           })
        }
        if(this.props.state === 'nsw'){
            this.setState({
                data: stateData.nsw
           })
        }
    }

    handleNext(){
        if(this.state.step !== this.state.data.length-1){
            this.setState({
                step: this.state.step + 1
            })
        }
    }

    handlePrev(){
        if(this.state.step !== 0){
            this.setState({
                step: this.state.step - 1
            })
        }
    }

    renderContent(){
        const currentViewPort = window.innerHeight - 115;
        const backColor = this.props.theme
        const page = this.state.data.map((v, index)=>{
            if(this.state.step === index){
                return (
                    <div className="help" key={index}>
                        <div className="help-content"  style={{backgroundColor: backColor, minHeight:currentViewPort}}>
                            <div>
                                <div>
                                    <p className="title" style={{textAlign:'center'}}>{v.title}</p>
                                    {v.step.map((v, index)=>{
                                        return <p key={index} className="sub-title" dangerouslySetInnerHTML={{__html:v}} ></p>
                                    })}
                                </div>
                            </div>
                            <div className="helpBtn">
                                <p className="sub-title" onClick={()=>{this.handlePrev()}}>{index!==0? this.state.data[index-1].title : null}</p>
                                <p className="sub-title" onClick={()=>{this.handleNext()}}>{index!==this.state.data.length-1? this.state.data[index+1].title : null}</p>
                            </div>
                        </div>
                    </div>
                )
            } else return null
        })
        return page
    }

    render(){
        return(
            this.renderContent()
        )
    }
}

export default HelpPage
