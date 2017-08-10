const procfile = require('../../../../lib/procfiles/index');
const ui = require('../../../../lib/UI');

let def = {
    name: "proclist",
    source: __dirname,
    validoptions: {

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
    help: function () {
        bigshell.core.help.link({helpfile: def.name, target: 'main'});
    },
    exitOnError: true,
    main: function (opts) {
        ui.controller.messageAppend("Recognized Processes");
        for(let j in procfile.procs){
            ui.controller.messageAppend("\t" + j, '/help/' + j);
        }
    },
    sub: function (opts) {
        console.log(opts.payload);
    }
};

exports.def = def;