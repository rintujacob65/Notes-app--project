const mongoose = require('mongoose')

const setupDB = () => {
    mongoose.Promise = global.Promise
    const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nov-notes-app'
    mongoose.connect(CONNECTION_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify : false})
   
        .then(() => {
            console.log("connected to db")
        })
        .catch((err) => {
             console.log(err)
        })
}
module.exports = setupDB