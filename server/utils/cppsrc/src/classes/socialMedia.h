#include <stdio.h>
#include <napi.h>
#include <string>

class SocialMedia {
    public:
        SocialMedia(std::string facebook, std::string instagram, std::string linkedin, std::string twitter);
        std::string getFacebook();
        std::string getInstagram();
        std::string getLinkedin();
        std::string getTwitter();
        Napi::Object returnObj(Napi::Env env);
    private: 
        std::string facebook_;
        std::string instagram_;
        std::string linkedin_;
        std::string twitter_;
};