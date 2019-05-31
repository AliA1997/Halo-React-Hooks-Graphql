#include <napi.h>
#include "registerForm.h"
#include "user.h"
#include "updateP.h"
#include "postInput.h"
#include "updateC.h"
#include "commentInput.h"
#include "socialMedia.h"
#include "smP.h"

//Make your class inherit n-api objectWrap class.
class InputWrapper : public Napi::ObjectWrap<InputWrapper> {
    //Define static method that are public.
    public:
        
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        
        InputWrapper(const Napi::CallbackInfo& info);

        Napi::Value ReturnObj(const Napi::CallbackInfo& info);

        void CreateUpdatedSmInstance(const Napi::CallbackInfo& info);

        void CreateSocialMediaInstance(const Napi::CallbackInfo& info);
        
        void CreateUserInstance(const Napi::CallbackInfo& info);

        void CreateRegisterFormInstance(const Napi::CallbackInfo& info);
        
        void CreatePostInputInstance(const Napi::CallbackInfo& info);

        void CreateUpdatePostInstance(const Napi::CallbackInfo& info);
        
        void CreateCommentInputInstance(const Napi::CallbackInfo& info);

        void CreateUpdatedCommentInstance(const Napi::CallbackInfo& info);
        
        bool DetermineValidArguments(const Napi::CallbackInfo& info, Napi::String registerCompare, Napi::String postCompare, Napi::String updatePostCompare, Napi::String commentCompare, Napi::String updateCommentCompare, Napi::String userCompare, Napi::String socialMediaCompare, Napi::String updateSmCompare, Napi::String compareValue);
        
        //For determining the internal instance to defien pass the current environment, typeOfINstance string and current InputWrapper instance.
        void DetermineInstanceToDefine(Napi::Env env, Napi::String typeOfInstance, InputWrapper* parentInstance, Napi::String registerCompare, Napi::String postCompare, Napi::String updatePostCompare, Napi::String userCompare, Napi::String socialMediaCompare, Napi::String updateSmCompare, Napi::String commentCompare, Napi::String updateCommentCompare);
        
        CommentInput* GetCommentInternalInstance();

        UpdateC* GetUpdatedCommentInternalInstance();
        
        PostInput* GetPostInternalInstance();

        UpdateP* GetUpdatePostInternalInstance();
        
        RegisterForm* GetUserInternalInstance();

        User* GetUserInfoInternalInstance();

        SocialMedia* GetSocialMediaInternalInstance();

        SmP* GetUpdatedSmInternalInstance();

    //Define your private methods and private members of class.
    private:
        
        static Napi::FunctionReference constructor;//Reference to store class definition
        
        //Have all definition in your InputWrapper class.
        //Define your private members
        CommentInput *currentComment_;

        UpdateC *updatedComment_;
        
        PostInput *currentPost_;

        UpdateP *updatedPost_;
        
        RegisterForm *registerForm_;

        User *user_;

        SocialMedia *socialMedia_;

        SmP *updatedSm_;
};