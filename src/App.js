import React, { Component } from 'react';
import Task from './task.js'
import axios from 'axios'
// import './index.css';

class App extends Component {
  state = {
      addForm:{
        text :''
      }, 
      image : '',
    items: [
      {'text': ''} 
    ]
  }
  updateForm = (event) => {
    const addText = event.target.value
    const originalState = this.state.addForm
    const copy = Object.assign({}, originalState);
    const key = event.target.name
    copy[key] = addText
    this.setState({
      addForm: copy
    })
  }

  submitForm = (event) => {
    event.preventDefault()
    const copy = this.state.items.slice(0)
    copy.push(this.state.addForm)
    this.setState({
      items : copy, addForm: { text:'' }
    })
  }

  deleteTask = (index) => {
    console.log('del')
    const copy = this.state.items.slice(0)
    copy.splice(index,1)
    this.setState({items : copy})
    console.log('delete task run')
  }
    
  componentDidMount(){

    axios({
      method: 'get',
      url: 'https://api.unsplash.com/photos/random?client_id=128c6d42935ec9ac7531df0274b453109c8d6137d58ddac9f3614019f78580bd'
    })
    .then(response => 
      
      this.setState({
        image: response.data.urls.regular
      })
      
      
      )
    .catch( e => console.log(e))

  }
  render() {
    const list = this.state.items.map((task, index) => {
      return <Task task = {task} index = {index} deleteTask = {this.deleteTask} />
    })

    return (
      <div className="container mt-5">
        <div className="row">

          <div className='todo-section col'>
          <h2 className="title">Taskful</h2>
            <form onSubmit = {this.submitForm} >
            <div className="input-group mb-3">
              <input className="form-control"  type = 'text' name = 'text' onChange = {this.updateForm} value = {this.state.addForm.text} autocomplete="off"/>
              </div>
            </form>

            <div className="container-fluid pt-3"> 
              <ul>
                {list}
              </ul> 
            </div>

          </div>

          <div className='image-section col'>
            
            <div className='image'> <img  src={this.state.image}/></div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
