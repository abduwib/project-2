import React, {Component} from 'react';
import './App.css'

class Task extends Component {
    state = {
        hide: 'false'
    }

    hideTask = () =>{
        if (this.state.hide === 'false'){
            this.setState({hide:'done'})
        } else {
            this.setState({hide:'false'})
        }
        console.log(this.state.hide)
    }
    render(){
        return(this.props.task.text === "" ? "" : <li>
                   
                    <span className ={this.state.hide} onClick={this.hideTask}> {this.props.task.text} </span>
                    <div className='rmbtn' onClick = {(event) => this.props.deleteTask(this.props.index)}> 
                    </div>
                </li>
        )
    }
}


export default Task;