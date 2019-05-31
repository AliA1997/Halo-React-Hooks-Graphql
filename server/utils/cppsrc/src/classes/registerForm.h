#include <stdio.h>
#include <string>
#include <napi.h>

class RegisterForm {
    public:
        RegisterForm(std::string username, std::string password, std::string avatar, int age, std::string dateRegistered, std::string dateUpdated, int deletedInd, int permanentlyDeletedInd);
        std::string getUsername();
        std::string getPassword();
        std::string getAvatar();
        int getAge();
        std::string getDateRegistered();
        std::string getDateUpdated();
        int getDeletedInd();
        int getPermanentlyDeletedInd();
        Napi::String returnSocialMedia(Napi::Env env);
        Napi::Object returnObj(Napi::Env env);
    private:
        std::string username_;
        std::string password_;
        std::string avatar_;
        int age_;
        std::string dateRegistered_;
        std::string dateUpdated_;
        int deletedInd_;
        int permanentlyDeletedInd_;
};