

let def = {
    name: "swaggerreport",
    source: __dirname,
    validoptions: {
        input: true,
        output: false,
        format: false
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
    help: bigshell.core.help.renderhelp,
    exitOnError: true,
    main: function (opts) {

    },
    sub: function (opts) {
        console.log(opts.payload);
    }
};

exports.def = def;