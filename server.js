const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFileSync(__dirname + '/log.txt', log + '\n');
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!!!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project Page'
    });
});

app.listen(3000, () => {
    console.log(`server is up on port ${port}`);
});