/**
 * Created by scolsen on 2/24/17.
 *
 */
const ui = require('../UI');
const logger = require('../logger');

class ShellInterface {
    constructor(error, stdout, stderr){
        this.error = error;
        this.stdout = stdout;
        this.stderr = stderr;
    }

     getOutput(){
        console.log(this.stdout);
        ui.controller.messageAppend(this.stdout.toString());
    };

    getErr(){
        console.log(this.stderr.toString(), this.error);
        logger.logWrite(this.error.toString());
        if(this.error.toString().match(/git/)){
            //suppress
        } else {
            ui.controller.messageAppend("Shell Interface Error");
        }
    };
}

exports.ShellInterface = ShellInterface;