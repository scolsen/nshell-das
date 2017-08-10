const parsers = require('../../built-ins/parsers');
const rl = require('readline');
const fs = require('fs');
const ui = require('../../../lib/UI');

function update (data){
    let o =chainOpts();
    let val = "";
    o.saveloc = o.propSource + ".properties";
    o.p = "/media/docsys/uptake/" + o.saveloc;
    function f(line, json){
            let kflag = false;
            console.log("reading");
            let key = line.split('=', 2);
            for(k in json){
                if(key[0] === k ){
                    kflag = true;
                    console.log("matched:", key[0], k);
                    if(key[1] !== '"' + json[k] + '"'){
                        val = val + key[0] + "=" + json[k] + "\n";
                    } else {
                        val = val + key[0] + "=" + key[1] + "\n";
                    }
                }
            }
            if(kflag === false){
                val = val + line + "\n";
            }
        }
        let reader = rl.createInterface({
            input:fs.createReadStream(o.p),
        });
        reader.on('line', function(line){
            f(line, data);
        });
        reader.on('close', function(){
            console.log("closed");
            fs.writeFile("/media/docsys/artifacts/" + o.saveloc, val, (err)=>{
                if (err) ui.controller.messageAppendError("Error saving file", err.toString());
                ui.controller.messageAppend("Wrote to ", "/media/docsys/artifacts/" + o.saveloc);
            });
        });
}

let def = {
    name: "updatepropsfromjson",
    source: __dirname,
    validoptions: {
        propSource: true,
        jsonSource: true,
        dependency: {
            1: parsers.jsonparser
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
    help: function () {
        bigshell.core.help.link({helpfile: def.name, target: 'main'});
    },
    exitOnError: true,
    main: function (opts) {
        let data = "";
        parsers.jsonparser.link({input: opts.jsonSource + ".json"})
            .chain(update)();
    },
    sub: function (opts) {
        console.log(opts.payload);
    }
};

exports.def = def;