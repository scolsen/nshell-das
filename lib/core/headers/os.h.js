/**
 * Wrapper around os to get Operating System Info.
 *
 */
const os = require('os');

function getPlatform(){
    console.log(os.platform());
    return chainable(os.platform());
}

let def = {
    name: "os",
    source: __dirname,
    validoptions: {},
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
        getPlatform();
    },
    sub: function (opts) {
        console.log(opts.payload);
    },
};

exports.def = def;