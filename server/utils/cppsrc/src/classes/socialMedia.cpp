#include "socialMedia.h"

SocialMedia::SocialMedia(std::string facebook, std::string instagram, std::string linkedin, std::string twitter) {
    this->facebook_ = facebook;
    this->instagram_ = instagram;
    this->linkedin_ = linkedin;
    this->twitter_ = twitter;
}

std::string SocialMedia::getFacebook() {
    return this->facebook_;
}

std::string SocialMedia::getInstagram() {
    return this->instagram_;
}

std::string SocialMedia::getLinkedin() {
    return this->linkedin_;
}

std::string SocialMedia::getTwitter() {
    return this->twitter_;
}

Napi::Object SocialMedia::returnObj(Napi::Env env) {
    Napi::Object objToReturn = Napi::Object::New(env);

    Napi::String facebookKey = Napi::String::New(env, "facebook");
    Napi::String facebookValue = Napi::String::New(env, this->facebook_);

    Napi::String instagramKey = Napi::String::New(env, "instagram");
    Napi::String instagramValue = Napi::String::New(env, this->instagram_);

    Napi::String linkedinKey = Napi::String::New(env, "linkedin");
    Napi::String linkedinValue = Napi::String::New(env, this->linkedin_);

    Napi::String twitterKey = Napi::String::New(env, "twitter");
    Napi::String twitterValue = Napi::String::New(env, this->twitter_);

    objToReturn.Set(facebookKey, facebookValue);
    objToReturn.Set(instagramKey, instagramValue);
    objToReturn.Set(linkedinKey, linkedinValue);
    objToReturn.Set(twitterKey, twitterValue);

    return objToReturn;
}