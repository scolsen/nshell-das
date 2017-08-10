

let def = {
    name: "prettyjson",
    source: __dirname,
    validoptions: {
        input: true,
        callback: false
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
    exitOnError: false,
    main: function (opts) {
        console.log(opts);
    },
    sub: function (opts) {
        let container = "";
        let tabindex = ""; //start with just no tab.
        //cycle through each character in the input string
        //this is horrendously inefficient. Find a better solution.
        console.log(opts.input);
       for(i =0; i< opts.input.length; i++){ //we have to use a classic for here, because for in optimizations ruin incrementation on i.
            let item = opts.input[i];
            let prev = opts.input[i-1];
            let nxt = opts.input[i+1];
            if(item == "{"){
                tabindex = tabindex + "\t"; //add another tabentry.
                item = "{\n" + tabindex;
            }
            if(item == "," && prev == '"' && nxt == '"'){
                item = ",\n" + tabindex;
            }
            if(item == "}" && prev == '"'){
                tabindex = tabindex.replace(/\t/, ""); //remove one tab
                item = "\n" + tabindex + "}";
            }
            container = container + item;
        }
        let result = container.toString();
        opts.callback(result);
    }
};

exports.def = def;