import React, { Component } from 'react';
import './styles.css'
import axios from 'axios'

class Home extends Component {

    state = {
        ownerInput:'',
        repoInput:'',
        issues:[]
    }

    onChangeOwner = (event) => {
        this.setState({ ownerInput: event.target.value })
    }

    onChangeRepo = (event) => {
        this.setState({ repoInput: event.target.value })
    }


    queryIssues = (event) => {
        event.preventDefault()
        let uri = 'http://localhost/' + this.state.ownerInput + '/' + this.state.repoInput + '/'
        console.log(uri)
        axios.get(uri)
        .then(res => {
            console.log(JSON.stringify(res.data,null,4))
            this.setState({ issues: res.data })
        })
        .catch(err => console.log(err))
    }

    renderIssues(issues){
        return issues.map((issue,i) => {
           return( <div key = {i}>
                <div> {issue.url} </div>
                 <div> {issue.repository_url} </div>
                  <div> {issue.title} </div>
                  <div> {issue.user.login} </div>
                  <br/> <br/>
            </div>
           )
        })
    }


  render() {
    
    let issues = this.state.issues

    return (
      <div className = 'home-container' >
        Search issues for a github repository

        <form onSubmit = { this.queryIssues }>
            <label>
                Owner name : 
                <input type = "text" onChange = {this.onChangeOwner} value = {this.state.ownerInput} />
            </label>

            <label>
                Repository :
                <input type = "text" onChange = {this.onChangeRepo} value = {this.state.repoInput} />
            </label>
             <input type="submit" value="Submit" />
            <br/>
        </form>
        <div>
        { this.renderIssues(issues) }
        </div>
      </div>
    );
  }
}

export default Home;
