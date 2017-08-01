import React, { Component } from 'react';
require('./styles.css')
import axios from 'axios'
import Issue from './Issue'

class Home extends Component {

    state = {
        ownerInput:'',
        repoInput:'',
        issues:[],
        loading:false,
        error:null
    }

    onChangeOwner = (event) => {
        this.setState({ ownerInput: event.target.value })
    }

    onChangeRepo = (event) => {

        this.setState({ repoInput: event.target.value })
    }

    queryIssues = (event) => {
        event.preventDefault()
        this.setState({loading:true})
        let uri = 'http://localhost:8080/' + this.state.ownerInput + '/' + this.state.repoInput + '/'
        console.log(uri)
        axios.get(uri)
        .then(res => {
            console.log(JSON.stringify(res.data,null,4))
            if(res.data.status === 'error'){
                return this.setState({ issues:[], error:true,loading:false })
            }
            this.setState({ issues: res.data, loading:false, error:null })
        })
        .catch(err => console.log(err))
    }

    clearResults = (event) => {
        event.preventDefault()
        this.setState({ issues:[],  })
    }

    renderIssues(issues){
        return issues.map((issue,i) => {
           return(
               <Issue issue = {issue}  key = {i} />
           )
        })
    }


  render() {
    
    let {issues,loading,error} = this.state

    return (
      <div className='home-container' >
        <h2 className = 'titleStyle'> Search issues for a github repository </h2>

        <form onSubmit = { this.queryIssues } className = 'form' >
            <label className = 'labelStyle' >
                {/* Owner name :  */}
                <input  className='inputStyle' type = "text" onChange = {this.onChangeOwner} value = {this.state.ownerInput}
                    placeholder='  owner name' required />
            </label>

            <label className = 'labelStyle' >
                {/* Repository : */}
                <input className='inputStyle' type = "text" onChange = {this.onChangeRepo} value = {this.state.repoInput} 
                placeholder='   repository name' required />
            </label>
             <input type="submit" value="Search" className = 'buttonStyle' />
             <button value="Clear" className = 'buttonStyle' onClick = {this.clearResults} > Clear </button>
            <br/>
        </form>
        <div className = 'issueContainer' >
             { loading? <div> Loading, please wait ... </div> : null } 
            { error ? <div> No repository found for these identifiers </div> : null }
            { issues.length > 0 ? this.renderIssues(issues) : null }
        </div>
      </div>
    );
  }
}

export default Home;
