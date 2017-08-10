const fs = require('fs');

let def = {
    name: "xml",
    source: __dirname,
    validoptions: {
        input: true,
        callback: false
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
    help: shellcom.help.renderhelp,
    exitOnError: true,
    main: function (opts) {
        console.log(opts);
    },
    sub: function (opts) {
        console.log(opts.payload);
    }
};

exports.def = def;