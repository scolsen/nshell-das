/** Validate the options object received by a given function.
* That's it!
* Valid options are specified in the function containing module.
* the format is:
* var object = {option : true/false}
* where the truth value indicates whether or not the option is required.
*/
const callstack = require('./callstack');
const ui = require('../UI');

function validate (options, proc, validOptions, dependency){ //function to run if validation is confirmed = cb
	//console.log("Caller", proc); //TODO: RESTORE WITH CLI OPTION.
	if(options.hasOwnProperty("help")){
	    proc.help();
	    process.exit();
    } else {
        if(JSON.stringify(options) == JSON.stringify({})){ //have to stringify for comparison.
            let procStr = proc.name.color(lmage) + " Options:";
            if(dependency == true){ procStr = "\t " + "dependency ".color(mage) + proc.name.color(lmage) + " Options:";}
                ui.controller.messageAppend(procStr, "main", "p");
            let tabs = "\t\t";
            if(dependency == true){tabs = "\t\t\t"}
            for (let i in validOptions){
                if(validOptions[i] == true){
                    ui.controller.messageAppendNoPs(tabs + i.color(cyan) + " required: " + validOptions[i].toString().color(lgreen), "main", "p");
                } else if(i.toString() == "dependency"){
                    for (let j in validOptions[i]){
                        validate({}, validOptions[i][j], validOptions[i][j]["validOpts"], true);
                    }
                } else {
                    ui.controller.messageAppendNoPs(tabs + i.color(cyan) + " required: " + validOptions[i].toString().color(lred), "main", "p");
                }
            }
            if(UIMODE != true){
                process.exit();
            } else {
                return;
            }
        }

        for (let key in validOptions){
            if(options.hasOwnProperty(key)){
                //if valid, do nothing.
            } else {
                if(validOptions[key] == true){
                    ui.controller.messageAppendError("Error: " + key + " is a required argument.");
                    if(proc.hasOwnProperty("help")){proc.help(proc.source);}
                    if(proc.hasOwnProperty("exitOnError") && proc.exitOnError == true){
                        console.log("exiting");
                        process.exit();
                    } else {
                        return false;
                    }
                }
            }
        }
        // if successful validation, report the known options and give the user a chance to exit before execution:
        //console.log("Running with the following options:");
        /*for (key in options) {
            console.log(" " + key + ":" + " " + options[key]); //TODO: Restor or remove this functionality.
        }*/
        return true;
    }
}

exports.validate = validate;