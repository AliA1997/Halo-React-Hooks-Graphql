#include <napi.h>
#include <stdio.h>
#include <string>

class PostInput {
    public:
        PostInput(std::string title, std::string image, std::string dateCreated, std::string dateUpdated, int deletedInd, int permanentlyDeletedInd, std::string userId);
        std::string getTitle();
        std::string getImage();
        std::string getDateCreated();
        std::string getDateUpdated();
        int getDeletedInd();
        int getPermanentlyDeletedInd();
        std::string getUserId();
        Napi::Object returnObj(Napi::Env env);
    private:
        std::string title_;
        std::string image_;
        std::string dateCreated_;
        std::string dateUpdated_;
        int deletedInd_;
        int permanentlyDeletedInd_;
        std::string userId_;
};
