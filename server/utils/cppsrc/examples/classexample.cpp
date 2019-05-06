#include "classexample.h"
#include <napi.h>

Napi::FunctionReference ClassExample::constructor;


Napi::Object ClassExample::Init(Napi::Env env, Napi::Object exports) {
    //Create your own scope
    // Napi::HandleScope scope(env);
    Napi::HandleScope scope(env);

    Napi::Function func = DefineClass(env, "ClassExample", {
        InstanceMethod("add", &ClassExample::Add),
        InstanceMethod("getName", &ClassExample::GetName),
        InstanceMethod("getUser", &ClassExample::GetUser),
        InstanceMethod("getValue", &ClassExample::GetValue),
        InstanceMethod("returnObj", &ClassExample::ReturnObj)
    });
    //Define your function that will define your class
    //-Pass your environment
    //-Your className
    //-ANd inject your method using the InstanceMethod from n-api
    //Use this to define the class that will be exported.
    // Napi::Function func = DefineClass(env, "ClassExample", {
    //     ///Can export it as a instance method or static method.
    //     InstanceMethod('add', &ClassExample::Add),
    //     InstanceMethod("getValue", &ClassExample::GetValue),
    // });

    constructor = Napi::Persistent(func);
    
    constructor.SuppressDestruct();

    //Export oyrou wrapped initializer
    exports.Set("ClassExample", func);

    return exports;
}

ClassExample::ClassExample(const Napi::CallbackInfo& info) : Napi::ObjectWrap<ClassExample>(info) {
    
    Napi::Env env = info.Env();
    
    Napi::HandleScope scope(env);


    if(info.Length() < 1)  {
        Napi::TypeError::New(env, "ClassExample instance expected").ThrowAsJavaScriptException();
    }

    //If the the first and second argument not a number and string return an a actualClass instance.
    if(!info[0].IsNumber() || !info[1].IsString()){
        //Convert your first argument to a object.
        Napi::Object object_parent = info[0].As<Napi::Object>();
        //Then wrap your object with yoru ClassExample.
        ClassExample* example_parent = Napi::ObjectWrap<ClassExample>::Unwrap(object_parent);
        //Then get the internal instance of that class.
        ActualClass* parent_actual_class_instance = example_parent->GetInternalInstance();
        //Then define a new instance with your class getValue and getName
        this->actualClass_ = new ActualClass(parent_actual_class_instance->getValue(), parent_actual_class_instance->getName(), parent_actual_class_instance->getUserOfClass());
        return;
    }

    //Convert your first argument to a n-api number
    Napi::Number setValue = info[0].As<Napi::Number>();

    Napi::String setName = info[1].As<Napi::String>();

    Napi::String setUser = info[2].As<Napi::String>();
    //Assign a instance of your actual class.
    //By passing your value's double value to the constructor.
    //If both arguments are a number and name set your properties
    this->actualClass_ = new ActualClass(setValue.DoubleValue(), setName, setUser);
}

Napi::Value ClassExample::GetUser(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    Napi::EscapableHandleScope scope(env);

    std::string user = this->actualClass_->getUserOfClass();

    // Napi::String result = Napi::String::New(env, user);

    return scope.Escape( Napi::String::New(env, user));

}

Napi::Value ClassExample::GetValue(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    Napi::EscapableHandleScope scope(env);

    double value = this->actualClass_->getValue();

    return scope.Escape(Napi::Number::New(env, value));
}

Napi::Value ClassExample::GetName(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    Napi::EscapableHandleScope scope(env);

    std::string name = this->actualClass_->getName();

    return scope.Escape(Napi::String::New(env, name));
}

Napi::Value ClassExample::Add(const Napi::CallbackInfo& info) {
    
    Napi::Env env = info.Env();
    Napi::EscapableHandleScope scope(env);
    
    if(info.Length() != 1 || !info[0].IsNumber()) {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    }

    Napi::Number addValue = info[0].As<Napi::Number>();

    double answer = this->actualClass_->add(addValue.DoubleValue());

    return scope.Escape(Napi::Number::New(env, answer));
}


Napi::Value ClassExample::ReturnObj(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    ///Set your escapable scope.
    Napi::EscapableHandleScope scope(env);

    Napi::Object objToReturn = this->actualClass_->returnObj(env);

    return scope.Escape(objToReturn);
}

ActualClass* ClassExample::GetInternalInstance() {
    return this->actualClass_;
}