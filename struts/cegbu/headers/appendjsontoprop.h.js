/**
 * Created by scolsen on 4/7/2017.
 * append contents of a specified json file to a specified properties file.
 */
const parsers = require('../../built-ins/parsers');
const rl = require('readline');
const fs = require('fs');
const ui = require('../../../lib/UI');

function update (data){
    let o =chainOpts();
    let val = "";
    let d = data;
    console.log(data);
    o.saveloc = o.propSource + ".properties";
    o.p = "/media/docsys/uptake/" + o.saveloc;

    let reader = rl.createInterface({
        input:fs.createReadStream(o.p),
    });
    reader.on('line', function(line){
        console.log("reading");
        val = val + line + "\n"; //grab original file content.
    });
    reader.on('close', function(){
        for(k in d){
            val = val + k + "=" + d[k] + "\n"; //append json content to val.
        }
        console.log("closed");
        fs.writeFile("/media/docsys/artifacts/" + o.saveloc, "", (err)=>{
            //clear the existing file.
            fs.appendFile("/media/docsys/artifacts/" + o.saveloc, val, (err)=>{
                if (err) ui.controller.messageAppendError("Error saving file", err.toString());
                ui.controller.messageAppend("Wrote json to ", "/media/docsys/artifacts/" + o.saveloc);
            });
        });
    });
}

let def = {
    name: "appendjsontoprop",
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