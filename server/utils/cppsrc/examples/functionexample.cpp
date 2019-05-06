#include "functionexample.h"

std::string functionexample::hello(){
    return "Hello World!";
}

std::string functionexample::returnFullName(std::string firstName, std::string lastName) {
    return firstName + " " + lastName;
}

Napi::String functionexample::FullNameWrapped(const Napi::CallbackInfo& info) {
    
    Napi::Env env = info.Env();

    if(info.Length() < 2 || !info[0].IsString() || !info[1].IsString()) {
        Napi::TypeError::New(env, "String expected.").ThrowAsJavaScriptException();
    }

    Napi::String firstName = info[0].As<Napi::String>();
    Napi::String lastName = info[1].As<Napi::String>();

    std::string fullName = functionexample::returnFullName(firstName, lastName);

    return Napi::String::New(env, fullName);
}

/*Define a funciton that will take a input parameter which in this case will be a and b, 
and will return output. */
int functionexample::add(int a, int b) {
    return a + b;
} 

//Define a function that will subtract numbers which would tka e a input parameter which in this case will be a and b and will return subtracted value.
int functionexample::subtract(int a, int b) {
    return a - b;
}

//Define a function that will multiply number which would take a input parameter which in this case will x and y and will return the multiplied value.
int functionexample::multiply(int a, int b) {
    return a * b;
}

//Define a function taht will divdie numbers which woild take a input parameter which is the case with x and y and will return the divided value.
//From your functionexample namespace.
int functionexample::divide(int x, int y) {
    return x/y;
}

/*Every function in C++ exports a wrapped function wrapped using N-API*/
/* Every wrapped function in C++ return a input param type and return value from N-API namespace*/
Napi::String functionexample::HelloWrapped(const Napi::CallbackInfo& info) 
{
    Napi::Env env = info.Env();
    Napi::String returnValue = Napi::String::New(env, functionexample::hello());
  
    return returnValue;
}


//Define your AddWrapped function.
Napi::Number functionexample::AddWrapped(const Napi::CallbackInfo& info) 
{
    /*Retrieve environment variables or the callback.*/
    Napi::Env env = info.Env();
    /*if the lenght is zero and if the first and second argument are not numbers return eerror*/
    if(info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
        /*Return an errror if your arguments does not meet function requirements.*/
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    }
    /*else convert both arguments to Napi numbers instances, then pass it to your functionexample.add namespace function and pass both of your numbers*/
    /*Cast each type*/
    Napi::Number first = info[0].As<Napi::Number>();
    Napi::Number second = info[1].As<Napi::Number>();

    /*Assign your return value to the result of the functionexample namespace calling it's add function.*/
    int returnValue = functionexample::add(first, second);
    //Return a new number value using the env or environemtn and returnValue
    return Napi::Number::New(env, returnValue);
}

//Define your Subtract wrapped function
Napi::Number functionexample::SubtractWrapped(const Napi::CallbackInfo& info) 
{
    //Define your environment variables.
    Napi::Env env = info.Env();

    //If the arguments length is lesss than two or the first and secord input is false throw an exception
    if(info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) 
    {
        Napi::TypeError::New(env, "Number needed").ThrowAsJavaScriptException();
    }

    //You do not need to do the typical N-API constructor to generate needed objects.
    //Can just cast them using .As<Napi Type>
    Napi::Number first = info[0].As<Napi::Number>();

    Napi::Number second = info[1].As<Napi::Number>();

    int returnValue = functionexample::subtract(first, second);

    //When converting your value into N-Api object make sure to pass you node_api env variables.
    return Napi::Number::New(env, returnValue);
}
                                                                        
//Defien your function that wilil be part of the functionexample namespace and will return a N-api Number
Napi::Number functionexample::MultiplyWrapped(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    if(info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) 
    {
        Napi::TypeError::New(env, "Number needed").ThrowAsJavaScriptException();
    }

    //Cast your first two input to numbers to be used in the multiply function
    Napi::Number first = info[0].As<Napi::Number>();

    Napi::Number second = info[1].As<Napi::Number>();

    int returnValue = functionexample::multiply(first, second);

    return Napi::Number::New(env, returnValue);
}


//Define your Divide wrapper function 
Napi::Number functionexample::DivideWrapped(const Napi::CallbackInfo& info) 
{
    //Retrieve environment variables.
    Napi::Env env = info.Env();

    if(info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) 
    {
        //Create a type error which will take your environment variables and your error message.
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    }

    //Define your N-API numbers to pass to your functionexample namespace divide function.
    Napi::Number first = info[0].As<Napi::Number>();

    Napi::Number second = info[1].As<Napi::Number>();

    //Define your returnValue which is the result of dividing your 2 N-API number instances
    int returnValue = functionexample::divide(first, second);

    //Return the returnValue converted to n-api.
    return Napi::Number::New(env, returnValue);
}

/*Use the init function return a key with corresponding wrapped function.*/
/*Add file path to binding.gyp to also compile those files.*/
Napi::Object functionexample::Init(Napi::Env env, Napi::Object exports) {
    exports.Set(
        "hello", Napi::Function::New(env, functionexample::HelloWrapped)
    );

    exports.Set(
        "printFullName", Napi::Function::New(env, functionexample::FullNameWrapped)
    );
        
    exports.Set(
        "add", Napi::Function::New(env, functionexample::AddWrapped)
    );

    exports.Set(
        "subtract", Napi::Function::New(env, functionexample::SubtractWrapped)
    );

    exports.Set(
        "multiply", Napi::Function::New(env, functionexample::MultiplyWrapped)
    );

    exports.Set(
        "divide", Napi::Function::New(env, functionexample::DivideWrapped)
    );

    return exports;
}