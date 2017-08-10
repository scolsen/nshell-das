/**
 * Created by scottolsen on 2/12/17.
 * Handles rendering console output to a section of the UI.
 * Enter a message, target html class to render the message in, and the containing element to append.
 */
const logger = require('../logger');
const http = require('http');

function messageAppendUI(message, loc, clr) {
    logger.logWrite("p", message, clr);
    if(loc){
        global.db.collection('log').save({message: message, loc: loc}, (err, result)=>{
            if(err){console.log(err);}
            console.log(message);
        });
    } else {
        global.db.collection('log').save({message: message}, (err, result)=>{
            if(err){console.log(err);}
            console.log(message);
        });
    }
}

function messageAppendUINoPs(message, clr) {
    logger.logWrite("p", message, clr);
    global.db.collection('log').save({message: message}, (err, result)=>{
        if(err){console.log(err);}
        console.log(message);
    });
}

function messageAppendError(message) {
    logger.logWrite("p", message);
        global.db.collection('log').save({error: message}, (err, result)=>{
            if(err){console.log(err);}
            console.log(message);
        });
}

    function fragmentAppendUI(frag, target) {
            let tar = document.getElementById(target);
            tar.appendChild(frag);
    }

function messageAppendNoUI(message) {
    //just log to console.
    //console.log(global.UIMODE);
    console.log(ps1.color(blue) + message);
}
function messageAppendNoUINoPs(message) {
    //just log to console.
    //console.log(global.UIMODE);
    console.log(message);
}


function fragmentAppendNoUI(frag) {
    console.log(global.UIMODE);
    console.log(frag);
}
function messageAppend(message, target, element){
    if(global.UIMODE == true){
        messageAppendUI(message, target, element);
    } else {
        messageAppendNoUI(message);
    }
}
function messageAppendNoPs(message, target, element){
    if(global.UIMODE == true){
        messageAppendUINoPs(message, target, element);
    } else {
        messageAppendNoUINoPs(message);
    }
}
function fragmentAppend(frag, target) {
    if (global.UIMODE == true) {
        fragmentAppendUI(frag, target);
    } else {
        fragmentAppendNoUI(frag);
    }
}
exports.messageAppend = messageAppend;
exports.messageAppendNoPs = messageAppendNoPs;
exports.fragmentAppend = fragmentAppend;
exports.messageAppendError = messageAppendError;