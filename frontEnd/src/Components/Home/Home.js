import React, { Component } from 'react';
require('./styles.css')
import axios from 'axios'
import Issue from './Issue'
const Rx = require('rxjs/Rx');


class Home extends Component {

    state = {
        ownerInput:'',
        repoInput:'',
        issues:[],
        cache:{},
        loading:false,
        error:false
    }

    onChangeOwner = (event) => {
        this.setState({ ownerInput: event.target.value })
    }

    onChangeRepo = (event) => {
        this.setState({ repoInput: event.target.value })
    }

    queryIssues = (event) => {
        event.preventDefault()
        this.setState({loading:true, error:false})
        let uri = 'http://localhost:8080/' + this.state.ownerInput.trim() + '/' + this.state.repoInput.trim() + '/'

        let {cache} = this.state
        let searchCacheForMatch = Object.keys(cache).find(key => key === uri )
        if( searchCacheForMatch ){
            return this.setState({ issues:cache[searchCacheForMatch] , loading:false, error:false })
        }

        var requestStream = Rx.Observable.of(uri);
        var reponseStream = requestStream.flatMap( reqUri =>{
            return Rx.Observable.fromPromise(axios.get(reqUri))
                                .map(res => res.data)
        })

        reponseStream.subscribe( 
            res => {
                if(res.status === 'error'){
                    return this.setState({ issues:[], error:true,loading:false,  })
                }
                this.setState({ issues: res, loading:false, error:null, cache:{ cache, [uri]: res } })
            }, error => {
                this.setState({ issues: [], loading:false, error:true })
            }, () => {
                console.log('completed')
            }

        )


        // axios.get(uri)
        // .then(res => {
        //     // console.log(JSON.stringify(res.data,null,4))
        //     if(res.data.status === 'error'){
        //         return this.setState({ issues:[], error:true,loading:false,  })
        //     }
        //     this.setState({ issues: res.data, loading:false, error:null, cache:{ cache, [uri]: res.data } })
        // })
        // .catch(err => this.setState({ issues: [], loading:false, error:true }) )
    }

    clearResults = (event) => {
        event.preventDefault()
        this.setState({ issues:[], error:false, loading:false })
    }

    renderIssues(issues){
        return issues.map((issue,i) => {
           return(
               <Issue issue = {issue}  key = {i} />
           )
        })
    }


  render() {
    
    let {issues,loading,error,ownerInput,repoInput} = this.state

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
        { loading? <div className='loading-text' > Loading, please wait ... </div> : null } 
        { error ? <div className='error-text' > No repository found for these identifiers </div> : null }

        { issues.length > 0 ? (<div className = 'issuesContainer' >
            <div className = 'issues-title'> Latest 50 issues for repository {ownerInput}/{repoInput} </div>
            { issues.length > 0 ? this.renderIssues(issues) : null }
        </div>) : null }
      </div>
    );
  }
}

export default Home;
