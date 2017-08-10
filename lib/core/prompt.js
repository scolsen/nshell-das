//Prompt the user for information or to continue processing. 
const readline = require('readline');
const callstack = require('./callstack.js');

let consoleLine = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

function runConfirm (prompt, cb, options, proc){ // optional pass to a callback for a function to run on user confirmation. //prompt = string to prompt user with
	consoleLine.question(prompt, function (input){
		switch(input) { 
			case "y":
			case "yes":
			case "YES":
			case "Yes":
			case "Y":			
				console.log("Ok. Running");
				console.log(proc.sync);
				if(proc.sync == true){
					return cb(options, callstack.release());
				}
				consoleLine.close();				
				break;
			case "n":
			case "no":
			case "N":
			case "No":
			case "NO":				
				console.log("Ok. Quitting.");				
				process.exit();			
				break;
			default:
				console.log("Please enter yes or no.\n");
				runConfirm(prompt, cb, options, proc);
		}
	});
}

exports.runConfirm = runConfirm;
exports.consoleLine = consoleLine;