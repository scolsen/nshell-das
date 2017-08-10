/**
 * Created by scolsen on 2/7/17.
 * Wrapper around common unix functionality ls
 */
const fs = require('fs');

function checkDirectoryExists(opts){
    let isDir;
    try {
        fs.lstatSync(opts.dir).isDirectory()
    } catch (e) {
        console.log("\n" + opts.dir + " is not a directory", e);
        bigshell.ui.controller.messageAppend("\n" + opts.dir + " is not a directory", "main", "p");
        return;
    }
    finally {
        isDir = true;
    }
    return isDir;
}

function listDirectory(opts){
    if (checkDirectoryExists(opts)) {
        fs.readdir(opts.dir, function (err, files) {
            if (err) {
                //handle error.
            }
            bigshell.ui.controller.messageAppend("Found files:", "main", "p");
            for(let i in files){
                bigshell.ui.controller.messageAppendNoPs(files[i], "main", "p");
            }
        });
    }
}

const def = {
    name: "ls",
    source: __dirname,
    validoptions : {
        dir: true,
        output: false,
        logfile: false,
        callback: false
    },
    prompt : false,
    linkable: true,
    sync : true,
    errors : {

    },
    exitOnError : false,
    main : function (opts) {
        listDirectory(opts);
    },
    sub: function (opts) {

    }
};

exports.def = def;