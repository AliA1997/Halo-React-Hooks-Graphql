#include "smP.h"

SmP::SmP(std::string smId, std::string facebook, std::string instagram, std::string twitter, std::string linkedin) {
    this->smId_ = smId;
    this->facebook_ = facebook;
    this->instagram_ = instagram;
    this->twitter_ = twitter;
    this->linkedin_ = linkedin;
}

std::string SmP::getId() {
    return this->smId_;
}

std::string SmP::getFacebook() {
    return this->facebook_;
}

std::string SmP::getInstagram() {
    return this->instagram_;
}

std::string SmP::getTwitter() {
    return this->twitter_;
}

std::string SmP::getLinkedIn() {
    return this->linkedin_;
}

Napi::Object SmP::returnObj(Napi::Env env) {
    Napi::Object objToReturn = Napi::Object::New(env);

    //Define keys and values for social media to return.
    Napi::String idKey = Napi::String::New(env, "id");
    Napi::String idValue = Napi::String::New(env, this->smId_);

    Napi::String facebookKey = Napi::String::New(env, "facebook");
    Napi::String facebookValue = Napi::String::New(env, this->facebook_);

    Napi::String instagramKey = Napi::String::New(env, "instagram");
    Napi::String instagramValue = Napi::String::New(env, this->instagram_);

    Napi::String twitterKey = Napi::String::New(env, "twitter");
    Napi::String twitterValue = Napi::String::New(env, this->twitter_);

    Napi::String linkedinKey = Napi::String::New(env, "linkedin");
    Napi::String linkedinValue = Napi::String::New(env, this->linkedin_);

    objToReturn.Set(idKey, idValue);
    objToReturn.Set(facebookKey, facebookValue);
    objToReturn.Set(instagramKey, instagramValue);
    objToReturn.Set(twitterKey, twitterValue);
    objToReturn.Set(linkedinKey, linkedinValue);

    return objToReturn;
}