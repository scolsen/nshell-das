const shellcom = require('../../../core/index');

let def = {
    name: "stackhist",
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