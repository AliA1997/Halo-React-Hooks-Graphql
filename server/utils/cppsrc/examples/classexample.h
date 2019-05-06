//import your n-api and your actualclass header file in order to do inheritance.
#include <napi.h>
#include "actualclass.h"

//Have your class inherit from the N-API class and have it wrap another object which would be our example class..
class ClassExample : public Napi::ObjectWrap<ClassExample> {
    //Defien a static method.
    public:
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        // //COnstructor to initialize class example
        ClassExample(const Napi::CallbackInfo& info);
        ActualClass* GetInternalInstance();

    //Private members of a class
    private:
        static Napi::FunctionReference constructor; //Reference to store class definition in js.
        //Have definitions for all your WrappedFunctions.
        Napi::Value GetValue(const Napi::CallbackInfo& info);
        Napi::Value GetName(const Napi::CallbackInfo& info);
        Napi::Value GetUser(const Napi::CallbackInfo& inf0);
        Napi::Value Add(const Napi::CallbackInfo& info);
        Napi::Value ReturnObj(const Napi::CallbackInfo& info);
        //Internal instance of the actual class that will be used to perform intended
        ActualClass *actualClass_;
};