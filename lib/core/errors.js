//error handling.
function nshellError(values){
    this.name = "\n\033[31mError:\033[0m " + values.name;
    this.message = "\n" + values.message;
    this.cause = "\n\033[31mCause:\033[0m " + values.cause;
    this.resolution = "\n\033[92mResolution:\033[0m " + values.resolution;
    this.show = function(){
        console.log(this.name, this.message, this.cause, this.resolution);
    };
    this.show();
}

const shellerrors = {
    processTypeError: {
        name: "Process Type Error",
        message: "Fatal, could not create process",
        cause: "A new process was created with incorrect arguments.",
        resolution: "Ensure your code calls shellcom.proc with the following arguments: (validoptions, prompt, sync, help, exitonerror, source, linkable, lopts, main)"
    },
    notLinkableError:{
        name: "Not Linkable Error",
        message: "Fatal, process is not linkable",
        cause: "A process link function was called but the process is not linkable.",
        resolution: "Ensure the called process has linkable : true"
    }
};

exports.nshellError = nshellError;
exports.shellerrors = shellerrors;