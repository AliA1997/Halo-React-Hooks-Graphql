#include "user.h"

User::User(std::string id, std::string username, std::string avatar, int age, std::string dateRegistered) {
    this->id_ = id;
    this->username_ = username;
    this->avatar_ = avatar;
    this->age_ = age;
    this->dateRegistered_ = dateRegistered;
}

std::string User::getId() {
    return this->id_;
}

std::string User::getUsername() {
    return this->username_;
}

std::string User::getAvatar() {
    return this->avatar_;
}

int User::getAge() {
    return this->age_;
}

std::string User::getDateRegistered() {
    return this->dateRegistered_;
}

Napi::Object User::returnObj(Napi::Env env) {
    Napi::Object objToReturn = Napi::Object::New(env);

    Napi::String idKey = Napi::String::New(env, "id");
    Napi::String idValue = Napi::String::New(env, this->id_);

    Napi::String usernameKey = Napi::String::New(env, "username");
    Napi::String usernameValue = Napi::String::New(env, this->username_);

    Napi::String avatarKey = Napi::String::New(env, "avatar");
    Napi::String avatarValue = Napi::String::New(env, this->avatar_);

    Napi::String ageKey = Napi::String::New(env, "age");
    Napi::Number ageValue = Napi::Number::New(env, this->age_);

    Napi::String dateRegisteredKey = Napi::String::New(env, "dateRegistered");
    Napi::String dateRegisteredValue = Napi::String::New(env, this->dateRegistered_);

    objToReturn.Set(idKey, idValue);
    objToReturn.Set(usernameKey, usernameValue);
    objToReturn.Set(avatarKey, avatarValue);
    objToReturn.Set(ageKey, ageValue);
    objToReturn.Set(dateRegisteredKey, dateRegisteredValue);

    return objToReturn;
}