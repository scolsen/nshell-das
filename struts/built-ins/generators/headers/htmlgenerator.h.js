const parsers = require('../../parsers/index');
const fs = require('fs');

function writeHtmlOutput(data){
    console.log("write caller:", chainOpts().output);
    let filename = chainOpts().output;
    fs.writeFile(chainOpts().output, data, (err)=>{
        if(err) {throw err;}
        console.log("Successfully wrote html to ", filename);
    });
    return chainable(data);
}

function logHtml(data){
    for (let k in data){
        console.log(data[k]["value"]);
    }
    return chainable(data);
}

function renderUI(data){
    bigshell.ui.controller.fragmentAppend(data, chainOpts().target);
     return chainable(data);
}

function makeHtml(data){
    //TODO: implement HTML writer that does not rely on document
            let docFrag = document.createDocumentFragment();
            for (let k in data){
                let kstr = data[k]["element"].toString();
                let elem = document.createElement(kstr);
                elem.textContent = data[k]["value"];
                if(data[k]["class"]){
                    elem.className = data[k]["class"];
                }
                docFrag.appendChild(elem);
            }
                return chainable(docFrag);
}

let def = {
    name: "htmlgenerator",
    source: __dirname,
    validoptions: {
        input: true,
        output:false,
        target: false,
        dependency: {
            proc: parsers.jsonparser
        }
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
        if(opts.input.match(/.*.json/)){
            parsers.jsonparser.link(opts)
                .cond((global.UIMODE == false && !opts.output), logHtml)()
                .cond(((opts.target || opts.output) && UIMODE == true), makeHtml)()
                .cond((opts.output), writeHtmlOutput)()
                .cond((global.UIMODE == true), renderUI)()
        }
    }
};

exports.def = def;