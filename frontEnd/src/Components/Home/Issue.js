
import React from 'react'
require('./styles.css')
var moment = require('moment');
moment().format();


class Issue extends React.Component{

    render(){
        const { issue } = this.props
        
        return(

            <div className = 'issueContainer'>


                <div className ='cell'>
                    <div className='field'> Github Page </div>
                    <a href={issue.html_url} target='_blank' className='value'> {issue.html_url} </a>
                </div>

                <div className ='cell'>
                    <div className='field'> Issue Title </div>
                    <div className='value'> {issue.title} </div>
                </div>

                <div className ='cell'>
                    <div className='field'> Issues Url </div>
                    <a href={issue.url} target='_blank' className='value'> {issue.url} </a>
                </div>
                <div className ='cell'>
                    <div className='field'> Repository Url </div>
                    <a href={issue.repository_url} target='_blank' className='value'> {issue.repository_url} </a>
                </div>
                <div className ='cell'>
                    <div className='field'> Comments Url </div>
                    <a href={issue.comments_url} target='_blank' className='value'> {issue.comments_url} </a>
                </div>
                <div className ='cell'>
                    <div className='field'> State </div>
                    <div className='value'> {issue.state} </div>
                </div>
                <div className ='cell'>
                    <div className='field'> User </div>
                    <a href={issue.user.html_url} target='_blank' className='value'> {issue.user.login} </a>
                </div>
                <div className ='cell'>
                    <div className='field'> Body </div>
                    <div className='value'> {issue.body} </div>
                </div>

                <div className ='cell'>
                    <div className='field'> Created At </div>
                    <div className='value'> {moment(issue.created_at).fromNow()} </div>
                </div>

                <div className ='cell'>
                    <div className='field'> Updated at </div>
                    <div className='value'> {moment(issue.updated_at).fromNow()} </div>
                </div>

            </div>
        )
    }
}

export default Issue


//         "url": "https://api.github.com/repos/octocat/Hello-World/issues/356",
//         "repository_url": "https://api.github.com/repos/octocat/Hello-World",
//         "labels_url": "https://api.github.com/repos/octocat/Hello-World/issues/356/labels{/name}",
//         "comments_url": "https://api.github.com/repos/octocat/Hello-World/issues/356/comments",
//         "events_url": "https://api.github.com/repos/octocat/Hello-World/issues/356/events",
//         "html_url": "https://github.com/octocat/Hello-World/issues/356",
//         "id": 243495759,
//         "number": 356,
//         "title": "testing",
//         "user": {
//             "login": "manaseer",
//             "id": 5521379,
//             "avatar_url": "https://avatars1.githubusercontent.com/u/5521379?v=4",
//             "gravatar_id": "",
//             "url": "https://api.github.com/users/manaseer",
//             "html_url": "https://github.com/manaseer",
//             "followers_url": "https://api.github.com/users/manaseer/followers",
//             "following_url": "https://api.github.com/users/manaseer/following{/other_user}",
//             "gists_url": "https://api.github.com/users/manaseer/gists{/gist_id}",
//             "starred_url": "https://api.github.com/users/manaseer/starred{/owner}{/repo}",
//             "subscriptions_url": "https://api.github.com/users/manaseer/subscriptions",
//             "organizations_url": "https://api.github.com/users/manaseer/orgs",
//             "repos_url": "https://api.github.com/users/manaseer/repos",
//             "events_url": "https://api.github.com/users/manaseer/events{/privacy}",
//             "received_events_url": "https://api.github.com/users/manaseer/received_events",
//             "type": "User",
//             "site_admin": false
//         },
//         "labels": [],
//         "state": "open",
//         "locked": false,
//         "assignee": null,
//         "assignees": [],
//         "milestone": null,
//         "comments": 0,
//         "created_at": "2017-07-17T19:08:47Z",
//         "updated_at": "2017-07-17T19:08:47Z",
//         "closed_at": null,
//         "body": "Testing GitHub's GraphQL API"