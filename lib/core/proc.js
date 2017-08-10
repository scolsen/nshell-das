/**
 * Created by scolsen on 2/8/17.
 * Class for defining new procs.
 * Is a duplex runnning in object mode.
 * JS objects, with arbitrary properties, are to be the preferred format for data exchange, interpretation, and manipulation.
 */
const errors = require('./errors');
const callstack = require('./callstack');
const validator = require('./optvalidator');
const helprender = require('./helprender');

class Proc {
    _checkProps(){
        //console.log(this); //TODO: restore with CLI option
        if(typeof this.validOpts != "object"){throw new errors.nshellError(errors.shellerrors.processTypeError);}
        if(typeof this.lopts != "object"){throw new errors.nshellError(errors.shellerrors.processTypeError);}
        if(typeof this.linkable != "boolean"){throw new errors.nshellError(errors.shellerrors.processTypeError);}
        if(typeof this.sync != "boolean"){throw new errors.nshellError(errors.shellerrors.processTypeError);}
        if(typeof this.prompt != "boolean"){throw new errors.nshellError(errors.shellerrors.processTypeError);}
        if(typeof this.source != "string"){throw new errors.nshellError(errors.shellerrors.processTypeError);}
        //if(typeof this.help != "function"){throw new errors.nshellError(errors.shellerrors.processTypeError);}
        if(typeof this.exitOnError != "boolean"){throw new errors.nshellError(errors.shellerrors.processTypeError);}
        if(typeof this.main != "function"){throw new errors.nshellError(errors.shellerrors.processTypeError);}
    };

    constructor(header){
        let self = this;
        if(header.name == undefined){
            this.name = "Unknown Process";
        } else {
            this.name = header.name;
        }
        this.validOpts = header.validoptions; //object
        this.linkable = header.linkable;
        if(header.linkable == true) {
            if(header.lopts == undefined) {
                this.lopts = this.validOpts;
            } else {
                this.lopts = header.lopts;
            }//if linkable is true but not explicit linking opts are specified use the validopts
            if(header.sub == undefined){
                this.sub = header.main;
            } else {
                this.sub = header.sub; //in case marked linkable but no sub defined, just run main.
            }
        }
        this.sync = header.sync;
        this.prompt = header.prompt; //default, prompt user before running proc.
        this.source = header.source;
        //this.help = header.help;
        this.exitOnError = header.exitOnError;
        this.main = header.main;

        this.hook = function (opts){
            let valid = validator.validate(opts, self, self.validOpts);
            try {
                self._checkProps();
            } catch (e) {
                console.log("Process type err");
                process.exit();
            }
            if (self.sync == true){callstack.close();}
            if(valid){
                    self.main(opts, callstack.release());
                } else {
                if(UIMODE == true){
                    callstack.release();
                } else {
                    callstack.next();
                }
            }
        };
        this.link = function(opts){
            let valid;
            if(opts != undefined){
                valid = validator.validate(opts, self, self.validOpts);
            } else {
                valid = true;
            }
            if(self.linkable == true){
                if(self.sub == self.main)
                    {console.warn("No sub function set for the process, running main.");}
                if (self.sync == true){callstack.close();}
                if(valid){
                    self.opts = opts;
                    console.log("Self.sub:" + self.name, self.sub);
                    return self.sub(opts, callstack.release());
                } else {
                    callstack.next();
                }
            } else {
                throw new errors.nshellError(errors.shellerrors.notLinkableError);
            }
        };
        this.chain = function(opts){
            let valid = true;
            if(self.linkable == true){
                if(self.sub == self.main)
                {console.warn("No sub function set for the process, running main.");}
                if (self.sync == true){callstack.close();}
                if(valid){
                    self.opts = opts;
                    console.log("Self.sub:", self.sub);
                    return self.sub(opts, callstack.release());
                } else {
                    callstack.next();
                }
            } else {
                throw new errors.nshellError(errors.shellerrors.notLinkableError);
            }
        };
    }
}

exports.Proc = Proc;
exports.Proc.hook = Proc.hook;
exports.Proc.link = Proc.link;
//exports.Proc.help = Proc.help;