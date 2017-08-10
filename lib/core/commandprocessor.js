/**
 * Created by scolsen on 2/9/17.
 * TO use electron we have to add the uiflag and arglist params to all command process functions.
 * Within the electron page process.argv contains an electron object which ruins our processing.
 * We circumvent incorrect use of process.argv and instead pass explicit items through the use of the UI.
 */
const callstack = require('./callstack');
const ui = require('../UI');

function purifyArgString (arg){
    //use this to remove dashes from arg string for validation
    return arg.replace(/-/,"");
}

function createOpts (uiFlag, args){ //construct an arguments object to pass to our functions. This enables easy expansion of options.
    let copts = {};
    let stop;
    //console.log("Creating opts with arguments", args); //TODO: restore with CLI option.
    if(uiFlag){
        args.forEach(function(item){
            let str = item.toString(); //because we can't break a foreach just set a stop condition w/ nested if. Improve.
            if (stop == true) {
                //
            } else {
                //console.log("Arguments", args);
                if (str.indexOf('-') == 0) { // use ":" as a delimiter to chain functions.
                    let val;
                    let flag;
                    flag = purifyArgString(str);
                    val = args.indexOf(item); //Since the actual value follows the flag, grab the next argv val.
                    copts[flag] = args[val + 1];
                } else if (str.indexOf(":") == 0 || str.indexOf("^") == 0 || str.indexOf("+") == 0) {
                    args = args.slice(args.indexOf(item) + 1, args.length); //remove args we processed
                    stop = true;
                }
            }
        });
    } else {
        process.argv.forEach(function (item) {
            let str = item.toString(); //because we can't break a foreach just set a stop condition w/ nested if. Improve.
            if (stop == true) {
                //
            } else {
                if (str.indexOf('-') == 0 && str != "-nUI") { // use ":" as a delimiter to chain functions.
                    let val;
                    let flag;
                    flag = purifyArgString(str);
                    val = process.argv.indexOf(item); //Since the actual value follows the flag, grab the next argv val.
                    if(process.argv[val + 1].indexOf('-') == 0 || process.argv[val + 1].indexOf(':') == 0){
                        copts[flag] = "set";
                    } else {
                        copts[flag] = process.argv[val + 1];
                    }
                } else if (str.indexOf(":") == 0 || str.indexOf("^") == 0 || str.indexOf("+") == 0) {
                    process.argv = process.argv.slice(process.argv.indexOf(item) + 1, process.argv.length); //remove args we processed
                    stop = true;
                }
            }
        });
    }
    return copts;
}

function cleanArgs(arg, uiFlag, argList){
    if(uiFlag){
        argList = argList. slice(argList.indexOf(arg)+1, argList.length);
        return argList;
    } else {
        process.argv = process.argv.slice(process.argv.indexOf(arg)+1, process.argv.length); //just ensures function arg isn't set as option for function.
    }
}

function commandProcess(arg, processToCall, uiFlag, arglist){
    //just adding tasks to function to make this easier
    let argList = cleanArgs(arg, uiFlag, arglist);
    let opts = createOpts(uiFlag, argList); // store args up until next :
    ui.controller.messageAppend("Running " + arg + " with options: ", "console-logs", "p");
    //ui.controller.messageAppend(opts, "console-logs", "button");
    //console.log("Running " + arg + " with options: ");
    if(JSON.stringify(opts) != JSON.stringify({})){
    for(k in opts){
            ui.controller.messageAppendNoPs("\t" + k + ": " + opts[k], "console-logs", "p");
        }
    } else {
        ui.controller.messageAppend("No options provided.", "console-logs", "p");
    }
    callstack.add(processToCall, opts); //add the target process with the generated options object, opts, to the callstack
}

function commandProcessLink(arg, processToCall, uiFlag, arglist){
    let argList = cleanArgs(arg, uiFlag, arglist);
    let opts = createOpts(uiFlag, argList); // store args up until next :
    console.log("Running " + arg + " with options: ");
    console.log(opts);
    callstack.link(processToCall, opts); //add the target process with the generated options object, opts, to the callstack
}

function commandProcessInject(arg, processToCall, uiFlag, arglist){
    let argList = cleanArgs(arg, uiFlag, arglist);
    let opts = createOpts(uiFlag, argList); // store args up until next :
    console.log("Running " + arg + " with options: ");
    console.log(opts);
    callstack.inject(processToCall, opts); //add the target process with the generated options object, opts, to the callstack
}

exports.commandProcess = commandProcess;
exports.commandProcessLink = commandProcessLink;
exports.commandProcessInject = commandProcessInject;