const cegbu = require('../../cegbu/index');
const git = require('../../git');
const fs = require('fs');
const shell = require('../../built-ins/shell');
const readline  = require('readline');
const generators = require('../../built-ins/generators');

function setopts(opts){
    if(!opts.hasOwnProperty("filt")){
        opts.filt = "";
    }
    let date = new Date();
    let dirBase = process.cwd();
    opts.shell = "bash";
    if(!opts.hasOwnProperty("output")){
        opts.output = "/media/docsys/artifacts/" + date.getYear() + date.getMonth() + date.getDay() + Math.random() + ".diff";
    } else {
        opts.output = "/media/docsys/artifacts/" + opts.output + ".diff";
    }
    opts.fileA = "/media/docsys/uptake/" + opts.fileA;
    opts.fileB = "/media/docsys/uptake/" + opts.fileB;
    opts.dirA = dirBase + "/artifacts/wsdldiffA" + date.getYear() + date.getMonth() + date.getDay();
    opts.dirB = dirBase + "/artifacts/wsdldiffB" + date.getYear() + date.getMonth() + date.getDay();
    return opts;
}
function prep(opts){
    let dirBase = process.cwd();
    if(fs.existsSync(opts.dirA) || fs.existsSync(opts.dirB)){
        shell.sh.link({command: "rm -rf " + opts.dirA + " " + opts.dirB, shell: "bash", mode:"sync"});
    }
    shell.sh.link({command: "rm -rf " + dirBase + "/artifacts/*", shell: "bash", mode:"sync"});
}

function wsdlDiff(opts) {
    shell.sh.link({command: "unzip " + opts.fileA + " -d " + opts.dirA, shell: opts.shell, mode:"async", con: function(){
        shell.sh.link({command: "unzip " + opts.fileB + " -d " + opts.dirB, shell: opts.shell, mode:"async", con: function(){
            shell.sh.link({command: "mv " + opts.dirA + "/*/* " + opts.dirA, shell: opts.shell, mode: "async", con: function(){
                shell.sh.link({command: "mv " + opts.dirB + "/*/* " + opts.dirB, shell: opts.shell, mode: "async", con: function(){
                    if(fs.existsSync(opts.dirA + "/V1" || opts.dirA + "/v1")){
                        shell.sh.link({command: "mv " + opts.dirA + "/V1/* " + opts.dirA, shell: opts.shell, mode: "sync"});
                        console.log("ran");
                    } else if (fs.existsSync(opts.dirA + "/all" || opts.dirA + "/All")){
			shell.sh.link({command: "mv " + opts.dirA + "/all/*/* " + opts.dirA, shell: opts.shell, mode: "sync"});
			shell.sh.link({command: "mv " + opts.dirA + "/all/* " + opts.dirA, shell: opts.shell, mode: "sync"});
		    }
                    if(fs.existsSync(opts.dirB + "/V1" || opts.dirB + "/v1")){
                        shell.sh.link({command: "mv " + opts.dirB + "/V1/* " + opts.dirB, shell: opts.shell, mode: "sync"});
                        console.log("ran");
                    } else if (fs.existsSync(opts.dirB + "/all" || opts.dirB + "/All")){
			shell.sh.link({command: "mv " + opts.dirB + "/all/*/* " + opts.dirB, shell: opts.shell, mode: "sync"});
			shell.sh.link({command: "mv " + opts.dirB + "/all/* " + opts.dirB, shell: opts.shell, mode: "sync"});

		    }
                    git.diff.link({fileA: opts.dirA, fileB: opts.dirB, output: opts.output, shell: opts.shell, options: opts.filt});
                }});
            }});
        }});
    }});
}

let def = {
    name: "wsdldiff",
    source: __dirname,
    validoptions: {
        fileA: true,
        fileB: true,
        all: false,
        filt: false,
        dependency: {
            1: cegbu.wsdl,
            2: git.diff
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
    help: function(){},
    exitOnError: true,
    main: function (opts) {
        prep(opts);
        wsdlDiff(setopts(opts));
    },
    sub: function (opts) {
        console.log(opts.payload);
    }
};

exports.def = def;
