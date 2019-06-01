#include <stdio.h>
#include <string>
#include <napi.h>

class UpdateP {
    public:
        UpdateP(std::string id, std::string title, std::string image, std::string dateCreated, std::string dateUpdated, int deletedInd, int permanentlyDeletedInd, std::string userId);
        std::string getId();
        std::string getTitle();
        std::string getImage();
        std::string getDateCreated();
        std::string getDateUpdated();
        int getDeletedInd();
        int getPermanentlyDeleteedInd();
        std::string getUserId();
        Napi::Object returnObj(Napi::Env env);
        Napi::Object returnItemObj(Napi::Env env);
    private:
        std::string id_;
        std::string title_;
        std::string image_;
        std::string dateCreated_;
        std::string dateUpdated_;
        int deletedInd_;
        int permanentlyDeletedInd_;
        std::string userId_;
};