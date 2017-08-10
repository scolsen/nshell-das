const fs = require('fs');

function makeFile(opts){
    if(fs.existsSync(opts.filename)){
        throw new bigshell.core.errors.nshellError(def.errors.fileExists);
    }
    fs.closeSync(fs.openSync(opts.filename, 'w'));
}

let def = {
    source: __dirname,
    validoptions: {
        filename: true
    },
    sync: true,
    linkable: true,
    prompt: false,
    errors: {
        fileExists : {
            name: "File Exists",
            message: "Could not create file. Already exists.",
            cause: "The provided filename already exists",
            resolution: "Use a different file name, or delete existing files"
        }
    },
    help: bigshell.core.help.renderhelp,
    exitOnError: true,
    main: function (opts) {
        makeFile(opts);
    },
    sub: function(data){

    }
};

exports.def = def;