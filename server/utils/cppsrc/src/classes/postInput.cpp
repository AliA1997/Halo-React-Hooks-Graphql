#include <napi.h>
#include <stdio.h>
#include <string>
#include "postInput.h"

PostInput::PostInput(std::string title, std::string image, std::string dateCreated) {
    this->title_ = title;
    this->image_ = image;
    this->dateCreated_ = dateCreated;
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

Napi::Object PostInput::returnObj(Napi::Env env) {
    Napi::Object objToReturn = Napi::Object::New(env);
    //Define your value and keys for the object you will return.
    Napi::String titleKey = Napi::String::New(env, "title");
    Napi::String titleValue = Napi::String::New(env, this->title_);

    Napi::String avatarKey = Napi::String::New(env, "image");
    Napi::String avatarValue = Napi::String::New(env, this->image_);

    Napi::String dateCreatedKey = Napi::String::New(env, "dateCreated");
    Napi::String dateCreatedValue = Napi::String::New(env, this->dateCreated_);

    objToReturn.Set(titleKey, titleValue);

    objToReturn.Set(avatarKey, avatarValue);

    objToReturn.Set(dateCreatedKey, dateCreatedValue);

    return objToReturn;
}

