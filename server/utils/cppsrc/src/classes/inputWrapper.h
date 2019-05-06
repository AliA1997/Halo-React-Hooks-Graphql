#include <napi.h>
#include "registerForm.h"
#include "postInput.h"
#include "commentInput.h"

//Make your class inherit n-api objectWrap class.
class InputWrapper : public Napi::ObjectWrap<InputWrapper> {
    //Define static method that are public.
    public:
        
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        
        InputWrapper(const Napi::CallbackInfo& info);

        Napi::Value ReturnObj(const Napi::CallbackInfo& info);
        
        void CreateRegisterFormInstance(const Napi::CallbackInfo& info);
        
        void CreatePostInputInstance(const Napi::CallbackInfo& info);
        
        void CreateCommentInputInstance(const Napi::CallbackInfo& info);
        
        bool DetermineValidArguments(const Napi::CallbackInfo& info, Napi::String userCompare, Napi::String postCompare, Napi::String commentCompare, Napi::String compareValue);
        
        //For determining the internal instance to defien pass the current environment, typeOfINstance string and current InputWrapper instance.
        void DetermineInstanceToDefine(Napi::Env env, Napi::String typeOfInstance, InputWrapper* parentInstance, Napi::String userCompare, Napi::String postCompare, Napi::String commentCompare);
        
        CommentInput* GetCommentInternalInstance();
        
        PostInput* GetPostInternalInstance();
        
        RegisterForm* GetUserInternalInstance();
    
    //Define your private methods and private members of class.
    private:
        
        static Napi::FunctionReference constructor;//Reference to store class definition
        
        //Have all definition in your InputWrapper class.
        //Define your private members
        CommentInput *currentComment_;
        
        PostInput *currentPost_;
        
        RegisterForm *registerForm_;
};