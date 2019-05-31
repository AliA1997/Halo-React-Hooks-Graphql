#include <stdio.h>
#include <string>
#include <napi.h>

class User {
    public:
        User(std::string id, std::string username, std::string avatar, int age, std::string dateRegistered, std::string dateUpdated, int deletedInd, int permanentlyDeletedInd);
        std::string getId();
        std::string getUsername();
        std::string getAvatar();
        int getAge();
        std::string getDateRegistered();    
        std::string getDateUpdated();
        int getDeletedInd();
        int getPermanentlyDeletedInd();   
        Napi::Object returnObj(Napi::Env env);
    private:
        std::string id_;
        std::string username_;
        std::string avatar_;
        int age_;
        std::string dateRegistered_;
        std::string dateUpdated_;
        int deletedInd_;
        int permanentlyDeletedInd_;
};