const helprender = require('../helprender');

let def = {
    name: "exit",
    source: __dirname,
    validoptions: {
        message: false //optional message to display on exit.
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
        if(opts.message){
            console.log(opts.message);
        }
        process.exit();
    },
    sub: function (opts) {
        //dump payload, then exit.
        console.log(opts.payload);
    }
};

exports.def = def;