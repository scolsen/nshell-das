/**
 * Created by scolsen on 3/7/17.
 */
const express = require('express');
const app = express();
const path = require('path');
const bp = require('body-parser');
const mongo = require('mongodb').MongoClient;
const ui = require('./lib/UI');
const nshell = require ('./nshell');
const url = require('url');
const procfile = require('./lib/procfiles/index');

global.app = app;
global.db = null;
app.set('view-engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    let cursor = db.collection('log').find().toArray(function(err, results){
        if(err) throw err;
        res.render('index.ejs', {log: results});
    })
});

app.post('/data', (req, res)=>{
    console.log(req.body);
    if(req.body.command.match(/:refresh/)){
        res.redirect('/');
    } else {
        global.db.collection('procs').save(req.body, (err, result)=>{
            if(err){console.log(err);}
            console.log(req.body);
            nshell.processInputUI(req.body);
        });
        console.log('saved to db');
        res.redirect('/');
    }
});

app.post('/reload', (req, res)=>{
    let cursor = db.collection('log').find().toArray(function(err, results){
        if(err) throw err;
        res.render('index.ejs', {log: results});
    })
});

app.get(/\/artifacts\/(.*)/, (req, res)=>{
    console.log(req);
    //let rsc = url.parse(req.url).pathname.replace(/.*artifacts/, "");
    //res.download(__dirname + '/artifacts/' + rsc);
    res.download(url.parse(req.url).pathname);
});

app.get(/\/help\/(.*)/, (req, res)=>{
    let rsc = url.parse(req.url).pathname.replace(/.*help(\/)/, "");
    res.render('helps/' + rsc + '.ejs');
});

app.get('/help', (req, res)=>{
    res.render('help.ejs', {proc: procfile.procs});
});

app.get('/menu', (req, res)=>{
    let d = {command: ':menu'};
    global.db.collection('procs').save(d, (err, result)=>{
        if(err){console.log(err);}
        console.log(d);
        nshell.processInputUI(d);
    });
    res.redirect('/');
});

mongo.connect('mongodb://localhost:27017/data', (err, database)=>{
    if(err){
        throw err
    }
    global.db = database;
    //clean
    global.db.collection('procs').remove();
    global.db.collection('log').remove();
    app.listen(8000, 'localhost');
});
