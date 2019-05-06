#include <napi.h>
#include <stdio.h>
#include <string>

class PostInput {
    public:
        PostInput(std::string title, std::string image, std::string dateCreated);
        std::string getTitle();
        std::string getImage();
        std::string getDateCreated();
        Napi::Object returnObj(Napi::Env env);
    private:
        std::string title_;
        std::string image_;
        std::string dateCreated_;
};
