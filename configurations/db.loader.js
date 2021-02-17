const mongoose = require('mongoose');
const config = require('./config');
const mongoURI = 'mongodb://localhost:27017/ulteratech'
// const mongoURI = 'mongodb://' + config.db.user + ':' + encodeURIComponent(config.db.password) + '@' + config.db.host + '/' + config.db.database
// const UrlDB = 'mongodb://admin:'+encodeURIComponent('gsbitlabs@123')+'@65.0.105.97/practice'
mongoose.connect(mongoURI, { useCreateIndex: true, useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('database connected...');
}).catch(err => {
    console.log('connection Failed...');
});