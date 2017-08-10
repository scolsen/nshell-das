const fs = require('fs');

function makeDirectory(opts){
    if(!fs.existsSync(opts.dir)){
        try{
            fs.mkdirSync(opts.dir); //if dir does not exist make it.
            return opts.dir;
        } catch (e) {
            console.log(e);
        }
    } else {
        //TODO: Add error.
    }
}

let def = {
    name: "mkdir",
    source: __dirname,
    validoptions: {
        dir: true
    },
    linkable : true,
    sync: true,
    prompt: false,
    errors: {
        dirExists : {
            name: "Create Directory Error",
            message: "Could not create a directory at the specified location",
            cause: "The specified directory already exists",
            resolution: "Delete the existing directory and rerun, or use a different directory name"
        }
    },
    help: function(){
        //TODO: add help.
    },
    exitOnError: true,
    main: function (opts) {
        makeDirectory(opts);
    }
};

exports.def = def;