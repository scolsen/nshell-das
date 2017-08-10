
const jsonpaser = require('./jsonparser.h.js');
const fs = require('fs');

let def = Object.assign({}, jsonpaser.def); //have to use assign to get a new address aka an actual copy and not a polluted ref.

def.main = function(opts){
    if(opts.mode == 'jout' || opts.mode == 'out'){
        return JSON.stringify(opts.input);
    } else if (opts.mode == 'jin' || opts.mode ==  'in'){
        if(opts.input.match(/.*.nsh/)){
            fs.readFile(opts.input, function(err, data){
                if (err) {
                    throw new bigshell.errors.nshellError(jsonpaser.def.errors.fileReadError);
                }
                let json = JSON.stringify(data.toString());
                console.log();
                return JSON.parse(json);
            });
        } else {
            let json = JSON.stringify(opts.input); //ensure our input is formatted as JSON.
            return JSON.parse(json);
        }
    } else {
        throw new bigshell.errors.nshellError(jsonpaser.def.errors.modeError);
    }
};
def.name = "nshparser";

exports.def= def;