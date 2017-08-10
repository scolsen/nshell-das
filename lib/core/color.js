/**
 * Created by scolsen on 3/2/17.
 * Handles wrapping colors for command line output.
 */

//Syntactic Sugar for Strings.

String.prototype.color = function(colr){
    let self = this.valueOf();
    if (UIMODE == true){
        return self;
    } else {
        return colr(self);
    }
};

function cyan(str){
    let st = "\033[96m" + str + "\033[0m";
    return st;
}

function lred(str){
    let st = "\033[91m" + str + "\033[0m";
    return st;
}

function lgreen(str){
    let st = "\033[92m" + str + "\033[0m";
    return st;
}

function lmage(str){
    let st = "\033[95m" + str + "\033[0m";
    return st;
}

function blue(str){
    let st = "\033[94m" + str + "\033[0m";
    return st;
}

function mage(str){
    let st = "\033[35m" + str + "\033[0m";
    return st;
}

function color(str){
    if (UIMODE == true){
        //do nothing.
    } else {

    }
}

global.mage = mage;
global.cyan = cyan;
global.lmage = lmage;
global.lgreen = lgreen;
global.lred = lred;
global.blue = blue;