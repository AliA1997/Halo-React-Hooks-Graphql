/*
Include your node-addon-api and your classes you will use.
\/**/
// #include <napi.h>
// #include "classes/function.h"
// #include "classes/class.h"

/*
// Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
// /*
//     Initialize your classes.
// \/**/
//   function::Init(env, exports);
//   return class::Init(env, exports);
// }

// NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)

/* cppsrc/main.cpp */
/**/

/*
    #include <napi.h>
    imports macro's, classes, and functions.
    NODE_API_MODULE
    a macro's that will take a module name and a registerfunction
    InitAll
    takes 2 parameters which are passed by N-Api 
    the env which will be context to N-API function.
    the export which will be context to N-API function and classes.
\/**/
#include <napi.h>
#include "src/utils.h"
#include "src/classes/inputWrapper.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
    /*Return the env and exports passed to the functionexample namespace.*/
    return InputWrapper::Init(env, exports);
}

/*
    Entry point of nodejs addon, library loaded into active memory
    Match target in binding.gyp file
    //First argument is module name, and the second if the function that needs to be initialized.
/**/
NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)