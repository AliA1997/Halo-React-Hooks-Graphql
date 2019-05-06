#include <napi.h>
#include <stdio.h>
#include <string>
#include "commentInput.h"

CommentInput::CommentInput(std::string username, std::string body, std::string dateCreated) {
    this->username_ = username;
    this->body_ = body;
    this->dateCreated_ = dateCreated;
}

//Define methods for defining internal class instance within your InputWrapper when another class instance is passed as an argument.
std::string CommentInput::getUsername() {
    return this->username_;
}

std::string CommentInput::getBody() {
    return this->body_;
}

std::string CommentInput::getDateCreated() {
    return this->dateCreated_;
}

Napi::Object CommentInput::returnObj(Napi::Env env) {

    Napi::Object objToReturn = Napi::Object::New(env);
    //Define your keys and values 
    Napi::String usernameKey = Napi::String::New(env, "username");
    Napi::String usernameValue = Napi::String::New(env, this->username_);

    Napi::String bodyKey = Napi::String::New(env, "body");
    Napi::String bodyValue = Napi::String::New(env, this->body_);

    Napi::String dateCreatedKey = Napi::String::New(env, "dateCreated");
    Napi::String dateCreatedValue = Napi::String::New(env, this->dateCreated_);

    //Set your properties and ekys for your object to return.
    objToReturn.Set(usernameKey, usernameValue);
    objToReturn.Set(bodyKey, bodyValue);
    objToReturn.Set(dateCreatedKey, dateCreatedValue);

    return objToReturn;
}   
     