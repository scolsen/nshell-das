//callstack
//callstack is needed to run the chained functions synchronously, should that be desired--i.e. for file reads and writes. 
const util = require('util');
const fs = require('fs');
const ui = require('../UI');
let stackPoint = 0; //keep track of current process

let procIndex = 0; //index for tracking our command stack.

let callStack = {}; //Save our chained commands in a stack. First command to add is to exit the process.
let lock;

function add(fn){ //add a new fn to the callstack.
	callStack[procIndex] = {};
	if (arguments.length > 1){
		//if more args were passed, add them sequentially as params for the stack.
		let n = 0;
		for(arg in arguments){
			if (arg != 0){ //do not add zero since we handle it above.
				callStack[procIndex][n] = fn;
				callStack[procIndex][n][0] = arguments[arg];
				n++;
			}
		}	
	}
	procIndex++;
}

function inject(fn){ //add a new fn to the callstack.
   //console.log("Callstack", callStack)
    for (let k in callStack) {
       console.log(k);
        let keys = Object.keys(callStack[k]); //since we increment procIndex each add, to link a fn we want to subtract one.
        let keypoint = keys[keys.length-1]; //get last element of callstack[procindex]
        console.log(keypoint);
        callStack[k][keypoint+1] = fn; //add one more proc slot to the procindex space.
        let pointer = callStack[k][keypoint+1]; //since the object prop is a string, we convert to number
        console.log(pointer);
        if (arguments.length > 1){
            //if more args were passed, add them sequentially as params to the stack.
            let n = 0;
            console.log(callStack);
            for(arg in arguments){
                if (arg != 0){ //do not add zero since we handle it above.
                    callStack[k][keypoint+1][n] = arguments[arg];
                    n++;
                }
            }
        }
    }
}

function link(fn){ //link a new fn to the callstack.
    let keys = Object.keys(callStack[procIndex-1]); //since we increment procIndex each add, to link a fn we want to subtract one.
    let keypoint = keys[keys.length-1]; //get last element of callstack[procindex]
    console.log(keypoint);
    callStack[procIndex-1][keypoint+1] = fn; //add one more proc slot to the procindex space.
    let pointer = callStack[procIndex-1][keypoint+1]; //since the object prop is a string, we convert to number
    console.log(pointer);
    if (arguments.length > 1){
        //if more args were passed, add them sequentially as params to the stack.
        let n = 0;
        console.log(callStack);
        for(arg in arguments){
            if (arg != 0){ //do not add zero since we handle it above.
                callStack[procIndex-1][keypoint+1][n] = arguments[arg];
                n++;
            }
        }
    }
}

function async(){
	for(i in callStack){
		callStack[i](callStack[i][0]); //since node is async by default, just execute each item in the stack.
	}	
}

function sync(){	//sp == stackPoint //run thorugh all funcs in proc object assigning their options
    //if the func has a payload, a return value, assign it to the next options set.
    let passdata;
    for (let k in callStack[stackPoint]){
        //console.log(callStack[stackPoint][k]);
        //console.log(passdata);
        if(passdata != undefined){ //if the previously run function has an explicit return, pass the returned data to the next func in the stack.
            callStack[stackPoint][k][0].payload = passdata;
            passdata = callStack[stackPoint][k](callStack[stackPoint][k][0]); //if we also passed options, pass options and data.
        } else {
            passdata = callStack[stackPoint][k](callStack[stackPoint][k][0]);
        }
    }
	stackPoint++;
	//by default runs the next command in the sequence. Enable skipping via explicit arg pass. 
}

function lockCheck(){
	if(lock == false){
		if(callStack[stackPoint] == undefined){
			ui.controller.messageAppend("End of command stack reached.\n\tExiting.");
			fs.writeFile('../../logs/errors.log', "errors", function (err) {
                if(err){
                    fs.writeFile("/logs/errors.log", "errors", function(err){
                        console.log("No errorlog location found");
                    });
                }
            });
                process.exit();
		} else {	
			sync();
		}
	}
}

function lockCheckUI(){
    if(lock == false){
        if(callStack[stackPoint] == undefined){
            console.log("Waiting for input");
        } else {
            sync();
        }
    }
}

function close(){
	lock = true;
}

function release(){
	lock = false;
}

function monitor(){
	setInterval(lockCheck, 3000); //check if sync lock is true every three seconds.
}

function monitorUI(){
    setInterval(lockCheckUI, 3000); //check if sync lock is true every three seconds.
}

function drop(){
	delete callStack[stackPoint];
}

function stopMonitor(inter){
    clearInterval(inter); //stop monitoring on proc failure.
}

function next() {
    stackPoint++;
    if(callStack[stackPoint] == undefined && UIMODE != true){
        console.log("undefined point in command stack reached. \n Either you did not supply an :exit command, or something went wrong.");
        console.log("Logging results, then quitting.");
        process.exit();

    } else if (UIMODE == true){
        lockCheckUI();
    }
    else {
        callStack[stackPoint](callStack[stackPoint][0]);
    }
}

exports.next = sync;
exports.chain = sync;
exports.add = add;
exports.contents = callStack;
exports.sync = sync;
exports.async = async;
exports.exit = process.exit;
exports.release = release;
exports.close = close;
exports.monitor = monitor;
exports.drop = drop;
exports.stopMonitor = stopMonitor;
exports.next = next;
exports.stackPoint = stackPoint; //debug
exports.link = link;
exports.inject = inject;
exports.monitorUI = monitorUI;