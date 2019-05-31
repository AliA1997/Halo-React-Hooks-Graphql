#include "updateC.h"

UpdateC::UpdateC(std::string id, std::string username, std::string body, std::string dateCreated, std::string avatar, std::string dateUpdated, int deletedInd, int permanentlyDeletedInd, std::string postId) {
    this->id_ = id;
    this->username_ = username;
    this->avatar_ = avatar;
    this->body_ = body;
    this->dateCreated_ = dateCreated;
    this->dateUpdated_ = dateUpdated;
    this->deletedInd_ = deletedInd;
    this->permanentlyDeletedInd_ = permanentlyDeletedInd;
    this->postId_ = postId;
}

std::string UpdateC::getId() {
    return this->id_;
}

std::string UpdateC::getUsername() {
    return this->username_;
}

std::string UpdateC::getAvatar() {
    return this->avatar_;
}

std::string UpdateC::getBody() {
    return this->body_;
}

std::string UpdateC::getDateCreated() {
    return this->dateCreated_;
}

std::string UpdateC::getDateUpdated() {
    return this->dateUpdated_;
}

int UpdateC::getDeletedInd() {
    return this->deletedInd_;
}

int UpdateC::getPermanentlyDeletedInd() {
    return this->permanentlyDeletedInd_;
}

std::string UpdateC::getPostId() {
    return this->postId_;
}

Napi::Object UpdateC::returnObj(Napi::Env env) {
    Napi::Object objToReturn = Napi::Object::New(env);
    //Define keys and values
    Napi::String idKey = Napi::String::New(env, "id");
    Napi::String idValue = Napi::String::New(env, this->id_);

    Napi::String usernameKey = Napi::String::New(env, "username");
    Napi::String usernameValue = Napi::String::New(env, this->username_);

    Napi::String bodyKey = Napi::String::New(env, "body");
    Napi::String bodyValue = Napi::String::New(env, this->body_);

    Napi::String dateCreatedKey = Napi::String::New(env, "dateCreated");
    Napi::String dateCreatedValue = Napi::String::New(env, this->dateCreated_);

    Napi::String avatarKey = Napi::String::New(env, "avatar");
    Napi::String avatarValue = Napi::String::New(env, this->avatar_);

    Napi::String dateUpdatedKey = Napi::String::New(env, "dateUpdated");
    Napi::String dateUpdatedValue = Napi::String::New(env, this->dateUpdated_);

    Napi::String deletedIndKey = Napi::String::New(env, "deletedInd");
    Napi::Number deletedIndValue = Napi::Number::New(env, this->deletedInd_);

    Napi::String permanentlyDeletedIndKey = Napi::String::New(env, "permanentlyDeletedInd");
    Napi::Number permanentlyDeletedIndValue = Napi::Number::New(env, this->permanentlyDeletedInd_);

    Napi::String postIdKey = Napi::String::New(env, "postId");
    Napi::String postIdValue = Napi::String::New(env, this->postId_);


    //Set your properties and ekys for your object to return.
    objToReturn.Set(idKey, idValue);
    objToReturn.Set(usernameKey, usernameValue);
    objToReturn.Set(avatarKey, avatarValue);
    objToReturn.Set(bodyKey, bodyValue);
    objToReturn.Set(dateCreatedKey, dateCreatedValue);
    objToReturn.Set(dateUpdatedKey, dateUpdatedValue);
    objToReturn.Set(deletedIndKey, deletedIndValue);
    objToReturn.Set(permanentlyDeletedIndKey, permanentlyDeletedIndValue);
    objToReturn.Set(postIdKey, postIdValue);

    return objToReturn;
}