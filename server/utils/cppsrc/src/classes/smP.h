#include <stdio.h>
#include <string>
#include <napi.h>

class SmP {
    public:
        SmP(std::string smId, std::string facebook, std::string instagram, std::string twitter, std::string linkedin);
        std::string getId();
        std::string getFacebook();
        std::string getInstagram();
        std::string getTwitter();
        std::string getLinkedIn();
        Napi::Object returnObj(Napi::Env env);
    private:
        std::string smId_;
        std::string facebook_;
        std::string instagram_;
        std::string twitter_;
        std::string linkedin_;
};