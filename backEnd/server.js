const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const publicPath = __dirname.split('/build')[0]+'/frontEnd/public'
app.use(express.static(publicPath))

require('./routes')(express,app)



app.listen(process.env.PORT || 8080,()=>{
    console.log('server has started at port 8080')
})