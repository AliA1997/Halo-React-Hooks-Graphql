#include <stdio.h>
#include <string>
#include <napi.h>

class UpdateC {
    public:
        UpdateC(std::string id, std::string username, std::string body, std::string dateCreated, std::string avatar, std::string dateUpdated, int deletedInd, int permanentlyDeletedInd, std::string postId);
        std::string getId();
        std::string getUsername();
        std::string getAvatar();
        std::string getBody();
        std::string getDateCreated();
        std::string getDateUpdated();
        int getDeletedInd();
        int getPermanentlyDeletedInd();
        std::string getPostId();
        Napi::Object returnObj(Napi::Env env);
    private:
        std::string id_;
        std::string username_;
        std::string avatar_;
        std::string body_;
        std::string dateCreated_;
        std::string dateUpdated_;
        int deletedInd_;
        int permanentlyDeletedInd_;
        std::string postId_;
};