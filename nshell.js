#!/usr/bin/env node
//Responsible from reading CLI vals and passing to proper functions.
require('./lib/core/chain'); //MUST BE REQUIRED FOR CHAIN FUNCTOR
require('./globals.js'); //IMPORTANT MUST BE REQUIRED FIRST FOR CORE ACCESS.
require('./lib/core/color'); //FOR STRING COLOR RENDERING
const http = require('http');
const fs = require('fs');
const callstack = require('./lib/core/callstack.js');
const procs = require('./lib/procfiles/index'); //require modules in the proc file
const commandprocessor = require('./lib/core/commandprocessor');

function processInput (argList, uif){
    global.UIMODE = uif;
    let proc;
    if(argList == undefined) {
        process.argv.forEach(function (item) {
            if (item.indexOf(":") == 0 && item.indexOf('-') != 0) { //so long as the command does not begin with --, -, or so long as it isn't :, process as top level.
                proc = item.slice(1, item.length);
                commandprocessor.commandProcess(item, procs.procs[proc].hook);
            } else if (item.indexOf("^") == 0 && item.indexOf('-') != 0) {
                proc = item.slice(1, item.length);
                commandprocessor.commandProcessLink(item, procs.procs[proc].link); //if ^ is used, run the link func.
            } else if (item.match(/\.nsh/) && item.indexOf('-') != 0) { //if an .nsh is passed, use the nsh interpreter.
                console.log("nsh file passed");
                //nsh.readNsh(item); //pass the file to the nsh interpreter.
            } else if (item.indexOf('+') == 0 && item.indexOf('-') != 0) { //run the process after each precceding process.
                proc = item.slice(1, item.length);
                commandprocessor.commandProcessInject(item, procs.procs[proc].hook);
            }
        });
    } else {
        //console.log('passed arglist');
        let argpointer = argList;
        argList.forEach(function (item) {
            console.log(item);
                if (item.indexOf(":") == 0 && item.indexOf('-') != 0) { //so long as the command does not begin with --, -, or so long as it isn't :, process as top level.
                    proc = item.slice(1, item.length);
                    commandprocessor.commandProcess(item, procs.procs[proc].hook, true, argpointer);
                } else if (item.indexOf("^") == 0 && item.indexOf('-') != 0) {
                    proc = item.slice(1, item.length);
                    commandprocessor.commandProcessLink(item, procs.procs[proc].link, true, argpointer); //if ^ is used, run the link func.
                } else if (item.match(/\.nsh/) && item.indexOf('-') != 0) { //if an .nsh is passed, use the nsh interpreter.
                    console.log("nsh file passed");
                    //nsh.readNsh(item); //pass the file to the nsh interpreter.
                } else if (item.indexOf('+') == 0 && item.indexOf('-') != 0) { //run the process after each precceding process.
                    proc = item.slice(1, item.length);
                    commandprocessor.commandProcessInject(item, procs.procs[proc].hook, true, argpointer);
                }
        });
    }
}

function processInputUI(pid){
    let args = pid.command.split(' ');
    if (args.length < 3){
        args.push("-empty");
        args.push("null");
    }
    console.log(args);
    global.currentProc = pid._id;
    processInput(args, true);
    callstack.release();
    callstack.monitorUI();
}

//TODO: remove -nUI requirement
function processInputCLI(){
    if(process.argv.indexOf("-nUI") != -1){
        processInput(undefined, false);
        callstack.release();
        callstack.monitor();
    }
}

exports.processInputUI = processInputUI;
exports.processInputCLI = processInputCLI;

processInputCLI();
 //add async support, if sync == true, run .next, else run async.
//console.log("cs content", callstack.contents); //TODO: Restore with CLI option.