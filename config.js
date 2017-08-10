/**
 * Created by scolsen on 2/7/17.
 *
 */
const struts = {
    builtin : require('./struts/built-ins/procs'), //WARNING: Do not remove this line unless you do not want to globally load built in functions.
    swagger : require('./struts/swagger/procs'),
    cegbu : require('./struts/cegbu/procs'),
    git : require('./struts/git/procs')
};

exports.struts = struts;