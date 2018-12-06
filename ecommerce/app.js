const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const Products = require('./src/models/Product');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs')
let count = 1;

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
        process.exit();
    }
})

app.get('/', (req, res) => {
    Products.find({}, (err, products) => {
        if (err) throw err;
        console.log('Productos de Base de datos: ', products);
        if (products.length) {
            res.render('home.ejs', { products })
        } else {
            res.render('home.ejs', { products: productos })
        }
    })
})
// renderizar form,cargar item a la base de datos.
app.get('/add', (req, res) => {
    res.render('form.ejs')
})

app.post('/add', (req, res, next) => {
    console.log('BODYYY: ', req.body);
    Products.create(req.body, function(err,productos){
        if(err){
            return console.log("error")
        }else{
            res.redirect("/")
        }
    })
})
app.post('/add/:code', (req, res) => {
    if(req.params.code != 0) {
        let found = products.find(function(element){
            return element.id == req.params.code;
        });
        found = Object.assign(found, req.body)   
    } else {
        products.push(req.body);
        req.body.id = ++count
    }
    res.redirect('/')
})
//renderizar item solo
app.get('/product/:id', (req, res) => {
    Products.findById({_id : req.params.id }, function(err,productos){
        if(err){
            return console.log("error")
        }else{
            res.render("item.ejs", productos)
        }        
    });
})

app.get('/delete/:code', (req, res) =>{
    Products.deleteOne({_id : req.params.code}, function(err, result){
        if(err)
        res.redirect("/")
    })
})

app.get("/edit/:prodId", (req,res)=>{
    Products.findById(req.params.prodId , (err,result)=>{
        res.render("edit.ejs", result)
    })
})




app.listen(4000, () => console.log('listening in port 4000'))