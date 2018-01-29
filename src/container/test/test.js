import React, {Component} from 'react'
import axios from 'axios'

class TestPage extends Component{
    getJson(){
        axios
        .get("http://localhost:3000/bower3.json")
        .then((response) => {
           console.log(response)
          }).catch((err) => {
            console.log(err)
          })
    }
    render(){
        this.getJson()
        return (
            <div>
                <p>dass</p>
            </div>
            
        )
    }
}

export default TestPage