#include <napi.h>
#include <stdio.h>
#include <string>

class CommentInput {
    public:
        CommentInput(std::string username, std::string body, std::string dateCreated);
        //Define methods for defining a new instance when a internal instance is passed in
        //Since the properties of the class are private have member of the class that return the properties of the class that are public.
        std::string getUsername();
        std::string getBody();
        std::string getDateCreated();
        Napi::Object returnObj(Napi::Env env);
    private:
        std::string username_;
        std::string body_;
        std::string dateCreated_;
};