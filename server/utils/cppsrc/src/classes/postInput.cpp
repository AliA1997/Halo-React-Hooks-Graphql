#include <napi.h>
#include <stdio.h>
#include <string>
#include "postInput.h"

PostInput::PostInput(std::string title, std::string image, std::string dateCreated, std::string userId) {
    this->title_ = title;
    this->image_ = image;
    this->dateCreated_ = dateCreated;
    this->userId_ = userId;
}

//Define methods for defining a passed instance of the input wrapper class which is wrapping
//the RegiserForm, PostInput, and CommentInput class.
std::string PostInput::getTitle() {
    return this->title_;
}

std::string PostInput::getImage() {
    return this->image_;
}

std::string PostInput::getDateCreated() {
    return this->dateCreated_;
}

std::string PostInput::getUserId() {
    return this->userId_;
}

Napi::Object PostInput::returnObj(Napi::Env env) {
    Napi::Object objToReturn = Napi::Object::New(env);
    //Define your value and keys for the object you will return.
    Napi::String titleKey = Napi::String::New(env, "title");
    Napi::String titleValue = Napi::String::New(env, this->title_);

    Napi::String avatarKey = Napi::String::New(env, "image");
    Napi::String avatarValue = Napi::String::New(env, this->image_);

    Napi::String dateCreatedKey = Napi::String::New(env, "dateCreated");
    Napi::String dateCreatedValue = Napi::String::New(env, this->dateCreated_);

    Napi::String userIdKey = Napi::String::New(env, "userId");
    Napi::String userIdValue = Napi::String::New(env, this->userId_);

    objToReturn.Set(titleKey, titleValue);

    objToReturn.Set(avatarKey, avatarValue);

    objToReturn.Set(dateCreatedKey, dateCreatedValue);

    objToReturn.Set(userIdKey, userIdValue);

    return objToReturn;
}

