
import React from 'react'
require('./styles.css')

class Issue extends React.Component{

    render(){
        const { issue } = this.props

        return(
             <div  >
                <div> URL : {issue.url} </div>
                 <div> Repository URL : {issue.repository_url} </div>
                  <div> Title : {issue.title} </div>
                  <div> User Name : {issue.user.login} </div>
                  <br/> <br/>
            </div>
        )
    }
}

export default Issue