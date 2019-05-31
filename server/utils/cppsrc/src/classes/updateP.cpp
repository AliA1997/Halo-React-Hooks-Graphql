#include "updateP.h"

UpdateP::UpdateP(std::string id, std::string title, std::string image, std::string dateCreated, std::string dateUpdated, int deletedInd, int permanentlyDeletedInd, std::string userId) {
    this->id_ = id;
    this->title_ = title;
    this->image_ = image;
    this->dateCreated_ = dateCreated_;
    this->dateUpdated_ = dateUpdated_;
    this->deletedInd_ = deletedInd_;
    this->permanentlyDeletedInd_ = permanentlyDeletedInd;
    this->userId_ = userId;
}

std::string UpdateP::getId() {
    return this->id_;
}

std::string UpdateP::getTitle() {
    return this->title_;
}

std::string UpdateP::getImage() {
    return this->image_;
}

std::string UpdateP::getDateCreated() {
    return this->dateCreated_;
}

std::string UpdateP::getDateUpdated() {
    return this->dateUpdated_;
}

int UpdateP::getDeletedInd() {
    return this->deletedInd_;
}

int UpdateP::getPermanentlyDeleteedInd() {
    return this->permanentlyDeletedInd_;
}

std::string UpdateP::getUserId() {
    return this->userId_;
}

Napi::Object UpdateP::returnObj(Napi::Env env) {
    Napi::Object objToReturn = Napi::Object::New(env);

    //Define keys and values
    Napi::String idKey = Napi::String::New(env, "id");
    Napi::String idValue = Napi::String::New(env, this->id_);
    objToReturn.Set(idKey, idValue);

    Napi::String titleKey = Napi::String::New(env, "title");
    Napi::String titleValue = Napi::String::New(env, this->title_);
    objToReturn.Set(titleKey, titleValue);

    Napi::String imageKey = Napi::String::New(env, "image");
    Napi::String imageValue = Napi::String::New(env, this->image_);
    objToReturn.Set(imageKey, imageValue);

    Napi::String dateCreatedKey = Napi::String::New(env, "dateCreated");
    Napi::String dateCreatedValue = Napi::String::New(env, this->dateCreated_);
    objToReturn.Set(dateCreatedKey, dateCreatedValue);

    Napi::String dateUpdatedKey = Napi::String::New(env, "dateUpdated");
    Napi::String dateUpdatedValue = Napi::String::New(env, this->dateUpdated_);
    objToReturn.Set(dateUpdatedKey, dateUpdatedValue);

    Napi::String deletedIndKey = Napi::String::New(env, "deletedInd");
    Napi::Number deletedIndValue = Napi::Number::New(env, this->deletedInd_);
    objToReturn.Set(deletedIndKey, deletedIndValue);

    Napi::String permanentlyDeletedIndKey = Napi::String::New(env, "permanentlyDeletedInd");
    Napi::Number permanentlyDeletedIndValue = Napi::Number::New(env, this->permanentlyDeletedInd_);
    objToReturn.Set(permanentlyDeletedIndKey, permanentlyDeletedIndValue);

    Napi::String userIdKey = Napi::String::New(env, "userId");
    Napi::String userIdValue = Napi::String::New(env, this->userId_);
    objToReturn.Set(userIdKey, userIdValue);

    return objToReturn;
}