const express = require('express');
const search = require('./routes/search');
const detail = require('./routes/detail');
const morgan=require('morgan');
const app = express()

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});

//rutas de la app
app.use('/search', search)
app.use('/detail', detail)