/**
 * Created by scolsen on 2/21/17.
 * Sequential functor for chaining functions.
 * Note that undefined will be returned if the chained functions do not provide an explicit return value.
 */

Function.prototype.chain = function(fn){
    let src = this;
    console.log(this);
    return function(){
        return fn(src());
    };
};

Function.prototype.cond = function(statement, fn){ //Note statement must be passed in parens for equivalences/evaluations.
    let src = this;
    if(statement){
        Function.prototype.cond.flag = true; //used for holds evaluation.
        return function(){
            return fn(src());
        }
    } else {
        Function.prototype.cond.flag = false;
        return chainable(src); //we can just use chainable here to keep passing the same data. If the cond fails.
    }
};

Function.prototype.holds = function(fn){
    let src = this;
    if(Function.prototype.cond.flag == true){ //call on conditions to specify subsequent fns to execute if the condition was true.
        return function(){
            return fn(src());
        }
    }else {
        Function.prototype.cond.flag = false;
        return chainable(src);
        }
    };

function chainable (x){
    return ()=>{return x};
}

function chainTest(data){
    //tests chain execution.
    console.log("CHAINTEST, RECIEVED:", data);
    return chainable(data);
}

/*function sequence(fn){
    console.log("SEQ", arguments);
    return function(){
        console.log("SEQinner", arguments);
        let k = arguments;
        fn.apply(this, k);
        return fn;
    }
}*/ //TODO: perhaps a future improvement, for now we just have to wrap our fns manually.

global.chainable = chainable;
global.chainTest = chainTest;
global.chainOpts = function chainOpts(){return arguments.callee.caller.caller.caller.arguments[0]};
//global.sequence = sequence;