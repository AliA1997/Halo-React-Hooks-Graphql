#include "utils.h"


Napi::Object Utils::Init(Napi::Env env, Napi::Object exports) {
    //Set methods of your exports

    return exports;
}


// Napi::Object deepCopy(const Napi::CallbackInfo& info) {

//     Napi::Env env = info.Env();

//     Napi::String type = info[0].ToString();

//     Napi::Object newObj = Napi::Object::New(env);

//     if(type == Napi::String::New(env, "user")) {

//     } else if(type == Napi::String::New(env, "post")) {

//     } else if(type == Napi::String::New(env, "comment")) {

//     }
// }

