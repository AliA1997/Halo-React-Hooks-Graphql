#include <napi.h>
#include <stdio.h>
#include <string>
#include "registerForm.h"

RegisterForm::RegisterForm(std::string username, std::string password, std::string avatar, int age, std::string dateRegistered){
    this->username_ = username;
    this->password_ = password;
    this->avatar_ = avatar;
    this->age_ = age;
    this->dateRegistered_ = dateRegistered;
}

//Define methods for defining your internal instance for your INputWrapper
std::string RegisterForm::getUsername() {
    return this->username_;
}

std::string RegisterForm::getPassword() {
    return this->password_;
}

std::string RegisterForm::getAvatar() {
    return this->avatar_;
}

int RegisterForm::getAge() {
    return this->age_;
}

std::string RegisterForm::getDateRegistered() {
    return this->dateRegistered_;
}

Napi::Object RegisterForm::returnObj(Napi::Env env) {
    //Use your environment variables to create n-api related data types.
    Napi::Object objToReturn = Napi::Object::New(env);

    //Define your keys and values for your object using n-api.
    Napi::String usernameKey = Napi::String::New(env, "username");
    Napi::String usernameValue = Napi::String::New(env, this->username_);

    Napi::String passwordKey = Napi::String::New(env, "password");
    Napi::String passwordValue = Napi::String::New(env, this->password_);

    Napi::String avatarKey = Napi::String::New(env, "avatar");
    Napi::String avatarValue = Napi::String::New(env, this->avatar_);

    Napi::String ageKey = Napi::String::New(env, "age");
    Napi::Number ageValue = Napi::Number::New(env, this->age_);

    Napi::String dateRegisteredKey = Napi::String::New(env, "dateRegistered");
    Napi::String dateRegisteredValue = Napi::String::New(env, this->dateRegistered_);

    //Set the keys and values for your object.
    objToReturn.Set(usernameKey, usernameValue);
    objToReturn.Set(passwordKey, passwordValue);
    objToReturn.Set(avatarKey, avatarValue);
    objToReturn.Set(ageKey, ageValue);
    objToReturn.Set(dateRegisteredKey, dateRegisteredValue);
    
    return objToReturn;
}
