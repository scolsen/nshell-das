/**
 * Created by scolsen on 2/15/17.
 */
const helprender = require('../helprender');
const fs = require('fs');
const ui = require('../../UI');

function status(config, folder){
    if(config.indexOf(folder) != -1){
        return "active".color(lgreen);
    } else {
        return "inactive".color(lred);
    }
}

function checkStruts(filter){
    fs.readdir(shellRoot+'/struts', function(err, data){
        for(let i in data){
            let folder = data[i];
            fs.readdir(shellRoot + '/struts/' + folder, function(err, dat){
                let config = fs.readFileSync(shellRoot + '/config.js');
                if(dat.indexOf("procs.js") != -1 && status(config, folder).match(filter) ){
                    ui.controller.messageAppendNoPs("\033[1m"+folder+"\033[0m" + ": processes recognized " + status(config, folder));
                } else if(dat.indexOf("procs.js") == -1) {
                    console.log("\033[31m!WARNING:\033[0m " +"\033[1m"+ folder+"\033[0m"  + " is in the struts folder but does not contain a procs.js file. This struts processes will not be recognized.");
                }
            });
        }
    });
}

let def = {
    name: "struts",
    source: __dirname,
    validoptions: {
        all: false,
        active: false,
        inactive: false,
        warn: false
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
    help: helprender.renderhelp,
    exitOnError: true,
    main: function (opts) {
        if(opts.hasOwnProperty("all")){
            ui.controller.messageAppendNoPs("========All Struts========", true);
            checkStruts(/.*/);
        }
        if(opts.hasOwnProperty("active")){
            console.log("========Active Struts========");
            checkStruts(/active/);
        }
        if(opts.hasOwnProperty("inactive")){
            console.log("========Inactive Struts========");
            checkStruts(/inactive/);
        }
        if(opts.hasOwnProperty("warn")){
            console.log("========Struts Missing Proc Files========");
            checkStruts(/nullsafasfasfdamjsajkjfkja/); //nonsense strut name to return warnings only.
        }
    },
    sub: function (opts) {
        //dump payload, then exit.
        console.log(opts.payload);
    }
};

exports.def = def;