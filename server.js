const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./server/database/connection');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080 

app.use(morgan('tiny'));
  

db();

app.use(bodyparser.urlencoded({extended : true}))

app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'views/ejs') )

app.use('/css', express.static(path.resolve(__dirname, 'estilo/css')))
app.use('/img', express.static(path.resolve(__dirname, 'estilo/img')))
app.use('/js', express.static(path.resolve(__dirname, 'estilo/js')))


app.use('/', require('./server/routes/router'));

app.listen(PORT,() => {console.log(`Server is running on http://localhost:${PORT}`)})