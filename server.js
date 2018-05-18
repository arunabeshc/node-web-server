const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


hbs.registerHelper('getYear',()=>{
  return new Date().getFullYear();
})
app.get('/',(req,res)=>{
  //res.send('<h1>hi express lullu</h1>');
  res.send({
    name:'riju',
    likes:[
      'coding',
      'driving',
      'titanfall',
      'stupidity'
    ]
  })
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs',{
    pageTitle:"holahuu"
  });
});

app.use(express.static(__dirname+'/public'));

app.use((req,response,next)=>{

var now=new Date().toString();
var log=`${now} ${req.method} ${req.url}`;

fs.appendFile('server.log',log+"\n",(err)=>{
  if(err){
    console.log('Unable to append file');
  }
});

console.log(log);
  next();

})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    bodyText:'bla bla'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errormessage:'Unable to process request!!'
  });
});


app.listen(3000,()=>{
  console.log('Server is up and running on port 3000!!');
});
