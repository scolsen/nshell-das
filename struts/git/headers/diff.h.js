const shell = require('../../built-ins/shell');
const ui = require('../../../lib/UI');

let diffloc = "";

function log(si){
    if(si.error){
        si.getErr();
    } else {
        si.getOutput();
    }
    ui.controller.messageAppend("Wrote output to ", diffloc);
}

function gitDiff(opts){
    let date = new Date();
    console.log("diffing now");
    console.log(opts.output);
    if(!opts.hasOwnProperty("output")){
	opts.output = "";
    }
    if(!opts.hasOwnProperty("shell")){
	opts.shell = "bash";
    }
    if(!opts.output.match(/media\/docsys\/artifacts/) && opts.output != ""){
	opts.output = "/media/docsys/artifacts/" + opts.output + ".diff";
    } else if (opts.output == undefined || opts.output == null || opts.output == ""){
	opts.output = "/media/docsys/artifacts/" + date.getFullYear() + date.getMonth() + date.getDay() + Math.random() + ".diff"
    }
    console.log(opts.fileA);
    console.log(opts.fileB);
    if(!opts.fileA.match(/uptake/) && !opts.fileA.match(/nshell/)){
	opts.fileA = "/media/transfer/docsys/uptake/" + opts.fileA;
    }
    if(!opts.fileB.match(/uptake/) && !opts.fileB.match(/nshell/)){
	opts.fileB = "/media/transfer/docsys/uptake/" + opts.fileB; 
    }
    let cmd = "git diff --no-index " + opts.fileA + " " +  opts.fileB + " > " + opts.output;
    if (opts.options == undefined){
        opts.options = "";
    }
    ui.controller.messageAppend("diffing" + opts.fileA, opts.fileB);
    diffloc = opts.output;
    if(opts.hasOwnProperty("output")){
        shell.sh.link({command: "git diff --no-index " + opts.fileA + " " +  opts.fileB + " > " + opts.output, shell:opts.shell, callback: log, mode:"async"});
    } else {
        shell.sh.link({command: "git diff " + opts.options + opts.fileA + " " + opts.fileB, shell:opts.shell, callback: log, mode:"async"});
    }
}

let def = {
    name: "gitdiff",
    source: __dirname,
    validoptions: {
        fileA: true,
        fileB: true,
        output: false,
        shell: false,
        options: false,
        dependency: {
            proc: shell.sh
        }
    },
    linkable: true,
    sync: true,
    prompt: false,
    errors: {
        errorName: {
            name: "",
            message: "",
            cause: "",
            resolution: ""
        }
    },
    help: function () {
        bigshell.core.help.link({helpfile: def.name, target: 'main'});
    },
    exitOnError: true,
    main: function (opts) {
        gitDiff(opts);
        ui.controller.messageAppend("Wrote output to ", opts.output);
    },
    sub: function (opts) {
        gitDiff(opts);
    },
    gitDiff: gitDiff
};

exports.def = def;
