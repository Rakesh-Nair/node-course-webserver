const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

 var app = express();

 hbs.registerPartials(__dirname+'/views/partials');
 app.set('view engine','hbs');
 

 app.use((req, res, next) => {
     var now = new Date().toString();
     var log = `${now}: ${req.method} ${req.url}`;
     console.log(log);
     fs.appendFile('server.log',log+'\n', (err) => {
        if(err){
            console.log(err);
        }
     });
    next();
 });

//  app.use((req, res, next) => {
//     res.render('maintenance.hbs',{
//         pageTitle : 'Maintenance Page',
//         maintenanceMessage : 'Please visit after some time. Maintenance in progress' 
//     })
//  });

 app.use(express.static(__dirname+'/public'));
 
 hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
 });

 hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
 });
 app.get('/', (request, response) =>{
    response.render('home.hbs',{
        pageTitle : 'Home Page',
        welcomeMessage : 'Welcome User' 
    });
 });

 app.get('/about',(req, res) => {
     //res.send('About Page');
     res.render('about.hbs',{
         pageTitle : 'About Page'
     });
 });

 app.listen(3000);