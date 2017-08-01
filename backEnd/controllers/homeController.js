
const express = require('express')
const app = express()
const router = express.Router()
const Rx = require('rxjs/Rx');
const path = require('path')

const baseUri = 'https://api.github.com'
const axios =  require('axios')

const serverRenderedView = __dirname.split('/build')[0] + '/frontEnd/public/index.html'

// var jsonPath = path.join(__dirname, '..', 'config', 'dev', 'foobar.json');

router.get('/',(req,res)=>{
    res.sendFile(serverRenderedView)
})

router.get('/:owner/:repository',(req,res)=>{
    console.log('new data')
    const reqUri = baseUri+ '/repos/' + req.params.owner + '/' + req.params.repository + '/issues' + '?per_page=50'
    console.log(reqUri)

    let reqObs =  Rx.Observable.fromPromise(axios.get(reqUri))
                                .map(response => response.data)

    reqObs.subscribe( 
        response => {
            res.send(response)
        }, error => {
            res.send({ status:'error' })
        }, () => {
            console.log('completed')
        }

    )

})




module.exports = router





















// https://api.github.com/repos/octocat/Hello-World/issues