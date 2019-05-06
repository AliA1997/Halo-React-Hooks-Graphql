#include <stdio.h>
#include <napi.h>
#include <string>
#include "inputWrapper.h"

//Define your FUnction referennce towards your constructor.
Napi::FunctionReference InputWrapper::constructor;

Napi::Object InputWrapper::Init(Napi::Env env, Napi::Object exports) {
    //Create your own scope.
    Napi::HandleScope scope(env);

    //Define your instance methods for your class.
    Napi::Function func = DefineClass(env, "InputWrapper", {
        InstanceMethod("returnObj", &InputWrapper::ReturnObj)
    });

    constructor = Napi::Persistent(func);

    constructor.SuppressDestruct();

    exports.Set("InputWrapper", func);
    
    return exports;
}

InputWrapper::InputWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<InputWrapper>(info) {
    Napi::Env env = info.Env();

    Napi::HandleScope scope(env);

    //Convert typesToCompare to a n-api string
    Napi::String userCompare = Napi::String::New(env, "user");
    Napi::String postCompare = Napi::String::New(env, "post");
    Napi::String commentCompare = Napi::String::New(env, "comment");
    Napi::String compareValue;
    
    //Of the info[0] is a string assign the compareValue else return a type error
    if(info[0].IsString()) {
        //Convert valuesToCompare to a n-api string;
         compareValue = info[0].As<Napi::String>(); 
    } else {
        Napi::TypeError::New(env, "Must provide a type argument");
    }

    //If no arguments are given return a typeError
    if(info.Length() < 1) {
        Napi::Error::New(env);
    }

    //If the argument length is 2 then assign the previous instance to a class variable.
    //The first argument is the type of class and the second type is the class itself.
    if(info.Length() == 2 && info[1].IsObject()) {
        //Convert the class instance as a n-api object 
        Napi::Object parent_obj = info[1].As<Napi::Object>();
        //Then wrap your object with your InputWrapper 
        InputWrapper* parent = Napi::ObjectWrap<InputWrapper>::Unwrap(parent_obj);
        
        InputWrapper::DetermineInstanceToDefine(env, compareValue, parent, userCompare, postCompare, commentCompare);
        
        return;
    }
    
    //Determine if the arguments are valid 
    if(info.Length() > 2 && InputWrapper::DetermineValidArguments(info, userCompare, postCompare, commentCompare, compareValue)) {
     
        //Based on the compareValue initialize a new instance of a class.
        if(compareValue == userCompare) {
            InputWrapper::CreateRegisterFormInstance(info);
        } else if(compareValue == postCompare) {
            InputWrapper::CreatePostInputInstance(info);
        } else if(compareValue == commentCompare) {
            InputWrapper::CreateCommentInputInstance(info);
        }
    
    }
    
}


Napi::Value InputWrapper::ReturnObj(const Napi::CallbackInfo& info) {

    Napi::Env env = info.Env();

    Napi::EscapableHandleScope scope(env);

    Napi::Object objToReturn = Napi::Object::New(env);

    //Convert your first argument to a string.
    std::string type = std::string(info[0].ToString());

    if(!info[0].IsString() || info.Length() < 1) {
        Napi::TypeError::New(env, "Arguments error!!!");
    } 

    //Based on the first argument return a object from the registerForm class, or currentPost class, and currentComment post
    //If the string includes a user characters which will return a position else it will return the maximum position of characters 18446744073709551615
    if(type.find("user") != std::string::npos) {
        objToReturn = this->registerForm_->returnObj(env);
        //If the type does contain a post string will not equal the max position value. 
    } else if(type.find("post") != std::string::npos) {
        objToReturn = this->currentPost_->returnObj(env);
        //If the type does contain a comment string will not equal the max position value.
    } else if(type.find("comment") != std::string::npos) {
        objToReturn = this->currentComment_->returnObj(env);
    }

    return scope.Escape(objToReturn);
}

//Argument checker.
void InputWrapper::DetermineInstanceToDefine(Napi::Env env, Napi::String typeOfInstance, InputWrapper* parentInstance, Napi::String userCompare, Napi::String postCompare, Napi::String commentCompare) {
    //Convert your second argument to an object based on the first argument.
    if(typeOfInstance == userCompare) {

        //Then get the internal instance of that class or that actual members of that class.
        RegisterForm* register_form = parentInstance->GetUserInternalInstance();
        //Then assign your member of your wrapper class to the instance public methods.
        this->registerForm_ = new RegisterForm(register_form->getUsername(), register_form->getPassword(), register_form->getAvatar(), register_form->getAge(), register_form->getDateRegistered());
    
    } else if(typeOfInstance == postCompare) {

        //Then get the internal instance of that class or that actual members of that class.
        PostInput* post_input = parentInstance->GetPostInternalInstance();
        //Then assign your member of your wrapper class to the instance public methods.
        this->currentPost_ = new PostInput(post_input->getTitle(), post_input->getImage(), post_input->getDateCreated());

    } else if(typeOfInstance == commentCompare) {

        //Then get the internal instance of that class or that actual members of that class.
        CommentInput* comment_input = parentInstance->GetCommentInternalInstance();
        //Then assign your member of your wrapper class to the instance public methods.
        this->currentComment_ = new CommentInput(comment_input->getUsername(), comment_input->getBody(), comment_input->getDateCreated());

    } else {
        Napi::TypeError::New(env, "Error!!!!!!!!");
    }

    return;
}

//Determine valid arguments.
bool InputWrapper::DetermineValidArguments(const Napi::CallbackInfo& info, Napi::String userCompare, Napi::String postCompare, Napi::String commentCompare, Napi::String compareValue) {
    Napi::Env env = info.Env();
    //If it's a registerForm value and it contains valid arguments 
    return (
                (
                    info[0].IsString() && compareValue == userCompare
                    &&  (info[1].IsString() && info[2].IsString() && info[3].IsString() && info[4].IsNumber() && info[5].IsString())
                ) 
                || 
                //post value and it contains valid arguments
                (                    
                    info[0].IsString() && compareValue == postCompare
                    &&  (info[1].IsString() && info[2].IsString() && info[3].IsString())
                ) 
                || 
                //comment value and it contains valid arguments
                (
                    info[0].IsString() && compareValue == commentCompare
                    &&  (info[1].IsString() && info[2].IsString() && info[3].IsString())
                )
            );
}



void InputWrapper::CreateRegisterFormInstance(const Napi::CallbackInfo& info) {
    //Define your values.
    Napi::String username = info[1].As<Napi::String>();

    Napi::String password = info[2].As<Napi::String>();

    Napi::String avatar = info[3].As<Napi::String>();

    Napi::Number age = info[4].As<Napi::Number>();
    
    Napi::String dateRegistered = info[5].As<Napi::String>();

    //Assign a new RegisterFOrm class instance/
    this->registerForm_ = new RegisterForm(username, password, avatar, age, dateRegistered);

    return;
}

void InputWrapper::CreatePostInputInstance(const Napi::CallbackInfo& info) {
    //Define your values.
    Napi::String title = info[1].As<Napi::String>();

    Napi::String image = info[2].As<Napi::String>();

    Napi::String dateCreated = info[3].As<Napi::String>();

    //Define a new instance of the PostInput class.
    this->currentPost_ = new PostInput(title, image, dateCreated);

    return;
}

void InputWrapper::CreateCommentInputInstance(const Napi::CallbackInfo& info) {
    //Define your values.
    Napi::String username = info[1].As<Napi::String>();

    Napi::String body = info[2].As<Napi::String>();

    Napi::String dateCreated = info[3].As<Napi::String>();

    //Assign a new isntance of the CommentInput class.
    this->currentComment_ = new CommentInput(username, body, dateCreated);

    return;
}

RegisterForm* InputWrapper::GetUserInternalInstance() {
    return this->registerForm_;
}
    
PostInput* InputWrapper::GetPostInternalInstance() {
    return this->currentPost_;
}

CommentInput* InputWrapper::GetCommentInternalInstance() {
    return this->currentComment_;
}

    