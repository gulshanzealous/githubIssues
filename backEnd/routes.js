
const HomeController = require('./controllers/homeController')

module.exports = function(express,app){
    var router = express.Router()

    router.use('/',HomeController)

    router.all('*', (req,res)=>{
        res.json({ status:'error', message:'unkown route' })
    })

    app.use('/',router)
}