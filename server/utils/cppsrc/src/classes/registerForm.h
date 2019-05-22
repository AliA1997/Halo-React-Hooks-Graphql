#include <stdio.h>
#include <string>
#include <napi.h>

class RegisterForm {
    public:
        RegisterForm(std::string username, std::string password, std::string avatar, int age, std::string dateRegistered);
        std::string getUsername();
        std::string getPassword();
        std::string getAvatar();
        int getAge();
        std::string getDateRegistered();
        std::string getFacebook();
        std::string getInstagram();
        std::string getLinkedin();
        std::string getTwitter();
        Napi::String returnSocialMedia(Napi::Env env);
        Napi::Object returnObj(Napi::Env env);
    private:
        std::string username_;
        std::string password_;
        std::string avatar_;
        int age_;
        std::string dateRegistered_;
};