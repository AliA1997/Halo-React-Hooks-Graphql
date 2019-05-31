#include "registerForm.h"


RegisterForm::RegisterForm(std::string username, std::string password, std::string avatar, int age, std::string dateRegistered, std::string dateUpdated, int deletedInd, int permanentlyDeletedInd){
    this->username_ = username;
    this->password_ = password;
    this->avatar_ = avatar;
    this->age_ = age;
    this->dateRegistered_ = dateRegistered;
    this->dateUpdated_ = dateUpdated;
    this->deletedInd_ = deletedInd;
    this->permanentlyDeletedInd_ = permanentlyDeletedInd;
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

std::string RegisterForm::getDateUpdated() {
    return this->dateUpdated_;
}
        
int RegisterForm::getDeletedInd() {
    return this->deletedInd_;
}

int RegisterForm::getPermanentlyDeletedInd() {
    return this->permanentlyDeletedInd_;
}

Napi::Object RegisterForm::returnObj(Napi::Env env) {
    //Use your environment variables to create n-api related data types.
    Napi::Object objToReturn = Napi::Object::New(env);

    //Define your keys and values for your object using n-api.
    Napi::String usernameKey = Napi::String::New(env, "username");
    Napi::String usernameValue = Napi::String::New(env, this->username_);
    objToReturn.Set(usernameKey, usernameValue);

    Napi::String passwordKey = Napi::String::New(env, "password");
    Napi::String passwordValue = Napi::String::New(env, this->password_);
    objToReturn.Set(passwordKey, passwordValue);

    Napi::String avatarKey = Napi::String::New(env, "avatar");
    Napi::String avatarValue = Napi::String::New(env, this->avatar_);
    objToReturn.Set(avatarKey, avatarValue);

    Napi::String ageKey = Napi::String::New(env, "age");
    Napi::Number ageValue = Napi::Number::New(env, this->age_);
    objToReturn.Set(ageKey, ageValue);

    Napi::String dateRegisteredKey = Napi::String::New(env, "dateRegistered");
    Napi::String dateRegisteredValue = Napi::String::New(env, this->dateRegistered_);

    objToReturn.Set(dateRegisteredKey, dateRegisteredValue);

    Napi::String dateUpdatedKey = Napi::String::New(env, "dateUpdated");
    Napi::String dateUpdatedValue = Napi::String::New(env, this->dateUpdated_);

    objToReturn.Set(dateUpdatedKey, dateUpdatedValue);

    Napi::String deletedIndKey = Napi::String::New(env, "deletedInd");
    Napi::Number deletedIndValue = Napi::Number::New(env, this->deletedInd_);
    objToReturn.Set(deletedIndKey, deletedIndValue);

    Napi::String permanentlyDeletedIndKey = Napi::String::New(env, "permanentlyDeletedInd");
    Napi::Number permanentlyDeletedIndValue = Napi::Number::New(env, this->permanentlyDeletedInd_);
    objToReturn.Set(permanentlyDeletedIndKey, permanentlyDeletedIndValue);

    return objToReturn;
}
