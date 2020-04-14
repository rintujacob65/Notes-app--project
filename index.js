const express = require('express')
//npm install cors
const cors = require('cors')
const setupDB = require('./config/database')
const router = require('./config/routes')
const app = express()
const port = process.env.PORT || 3040; 

const path = require('path')
app.use(express.json())
app.use(cors())
app.use('/',router)
//db configuration
setupDB()

app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

app.listen(port,() => {
    console.log('listening on port', port)
})

