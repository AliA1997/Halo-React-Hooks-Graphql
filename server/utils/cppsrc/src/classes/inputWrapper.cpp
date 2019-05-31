#include "inputWrapper.h"

//Define your FUnction referennce towards your constructor.
Napi::FunctionReference InputWrapper::constructor;

Napi::Object InputWrapper::Init(Napi::Env env, Napi::Object exports) {
    //Create your own scope.
    Napi::HandleScope scope(env);

    //Define your instance methods for your class.
    Napi::Function func = DefineClass(env, "InputWrapper", {
        InstanceMethod("returnObj", &InputWrapper::ReturnObj)
    });

    constructor = Napi::Persistent(func);

    constructor.SuppressDestruct();

    exports.Set("InputWrapper", func);
    
    return exports;
}

InputWrapper::InputWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<InputWrapper>(info) {
    Napi::Env env = info.Env();

    Napi::HandleScope scope(env);

    //Convert typesToCompare to a n-api string
    Napi::String registerCompare = Napi::String::New(env, "register");
    Napi::String userCompare = Napi::String::New(env, "user");
    Napi::String socialMediaCompare = Napi::String::New(env, "socialMedia");
    Napi::String updatedSmCompare = Napi::String::New(env, "update-sm");
    Napi::String postCompare = Napi::String::New(env, "post");
    Napi::String updatePostCompare = Napi::String::New(env, "update-p");
    Napi::String commentCompare = Napi::String::New(env, "comment");
    Napi::String updateCommentCompare = Napi::String::New(env, "update-c");
    Napi::String compareValue;
    
    //Of the info[0] is a string assign the compareValue else return a type error
    if(info[0].IsString()) {
        //Convert valuesToCompare to a n-api string;
         compareValue = info[0].As<Napi::String>(); 
    } else {
        Napi::TypeError::New(env, "Must provide a type argument");
    }

    //If no arguments are given return a typeError
    if(info.Length() < 1) {
        Napi::Error::New(env);
    }

    //If the argument length is 2 then assign the previous instance to a class variable.
    //The first argument is the type of class and the second type is the class itself.
    if(info.Length() == 2 && info[1].IsObject()) {
        //Convert the class instance as a n-api object 
        Napi::Object parent_obj = info[1].As<Napi::Object>();
        //Then wrap your object with your InputWrapper 
        InputWrapper* parent = Napi::ObjectWrap<InputWrapper>::Unwrap(parent_obj);
        
        InputWrapper::DetermineInstanceToDefine(env, compareValue, parent, registerCompare, postCompare, updatePostCompare, userCompare, socialMediaCompare, updatedSmCompare, commentCompare, updateCommentCompare);
        
        return;
    }
    
    //Determine if the arguments are valid 
    if(info.Length() > 2 && InputWrapper::DetermineValidArguments(info, registerCompare, postCompare, updatePostCompare, commentCompare, updateCommentCompare, userCompare, socialMediaCompare, updatedSmCompare, compareValue)) {
     
        //Based on the compareValue initialize a new instance of a class.
        if(compareValue == registerCompare) {
            InputWrapper::CreateRegisterFormInstance(info);
        } else if(compareValue == userCompare) {
            InputWrapper::CreateUserInstance(info);
        } else if(compareValue == socialMediaCompare) {
            InputWrapper::CreateSocialMediaInstance(info);
        } else if(compareValue == updatedSmCompare) {
            InputWrapper::CreateUpdatedSmInstance(info);
        } else if(compareValue == postCompare) {
            InputWrapper::CreatePostInputInstance(info);
        } else if(compareValue == updatePostCompare) {
            InputWrapper::CreateUpdatePostInstance(info);
        } else if(compareValue == commentCompare) {
            InputWrapper::CreateCommentInputInstance(info);
        } else if(compareValue == updateCommentCompare) {
            InputWrapper::CreateUpdatedCommentInstance(info);
        }
    
    }
    
}


Napi::Value InputWrapper::ReturnObj(const Napi::CallbackInfo& info) {

    Napi::Env env = info.Env();

    Napi::EscapableHandleScope scope(env);

    Napi::Object objToReturn = Napi::Object::New(env);

    //Convert your first argument to a string.
    std::string type = std::string(info[0].ToString());

    if(!info[0].IsString() || info.Length() < 1) {
        Napi::TypeError::New(env, "Arguments error!!!");
    } 

    //Based on the first argument return a object from the registerForm class, or currentPost class, and currentComment post
    //If the string includes a user characters which will return a position else it will return the maximum position of characters 18446744073709551615
    if(type.find("register") != std::string::npos) {
        objToReturn = this->registerForm_->returnObj(env);
        //If the type does contain a post string will not equal the max position value. 
    } else if(type.find("user") != std::string::npos) {
        objToReturn = this->user_->returnObj(env);
    } else if(type.find("socialMedia") != std::string::npos) {
        objToReturn = this->socialMedia_->returnObj(env);
    } else if(type.find("update-sm") != std::string::npos) {
        objToReturn = this->updatedSm_->returnObj(env);
    } else if(type.find("post") != std::string::npos) {
        objToReturn = this->currentPost_->returnObj(env);
        //If the type does contain a comment string will not equal the max position value.
    } else if(type.find("update-p") != std::string::npos) {
        objToReturn = this->updatedPost_->returnObj(env);
    } else if(type.find("comment") != std::string::npos) {
        objToReturn = this->currentComment_->returnObj(env);
    } else if(type.find("update-c") != std::string::npos) {
        objToReturn = this->updatedComment_->returnObj(env);
    }

    return scope.Escape(objToReturn);
}

//Argument checker.
void InputWrapper::DetermineInstanceToDefine(Napi::Env env, Napi::String typeOfInstance, InputWrapper* parentInstance, Napi::String registerCompare, Napi::String postCompare, Napi::String updatePostCompare, 
                                            Napi::String userCompare, Napi::String socialMediaCompare, Napi::String updateSmCompare, Napi::String commentCompare, Napi::String updateCommentCompare) {
    //Convert your second argument to an object based on the first argument.
    if(typeOfInstance == registerCompare) {

        //Then get the internal instance of that class or that actual members of that class.
        RegisterForm* register_form = parentInstance->GetUserInternalInstance();
        //Then assign your member of your wrapper class to the instance public methods.
        this->registerForm_ = new RegisterForm(
                                register_form->getUsername(),
                                register_form->getPassword(),
                                register_form->getAvatar(),
                                register_form->getAge(),
                                register_form->getDateRegistered(),
                                register_form->getDateUpdated(),
                                register_form->getDeletedInd(),
                                register_form->getPermanentlyDeletedInd()
                                );
    
    } else if(typeOfInstance == updatePostCompare) {
        //Define a variable of type of hte UpdateP class.
        UpdateP* updated_post = parentInstance->GetUpdatePostInternalInstance();
        this->updatedPost_ = new UpdateP(
                                updated_post->getId(),
                                updated_post->getTitle(),
                                updated_post->getImage(),
                                updated_post->getDateCreated(),
                                updated_post->getDateUpdated(),
                                updated_post->getDeletedInd(),
                                updated_post->getPermanentlyDeleteedInd(),
                                updated_post->getUserId()
                                );
    } else if(typeOfInstance == userCompare) {
        //Then get the internal instance of that class or that actual members of that class.
        User* user = parentInstance->GetUserInfoInternalInstance();
        //Then assign your member of your wrapper class to the instance public methods.
        this->user_ = new User(
                                user->getId(),
                                user->getUsername(),
                                user->getAvatar(),
                                user->getAge(),
                                user->getDateRegistered(),
                                user->getDateUpdated(),
                                user->getDeletedInd(),
                                user->getPermanentlyDeletedInd()
                            );
    
    } else if(typeOfInstance == socialMediaCompare) {
        SocialMedia* socialMedia = parentInstance->GetSocialMediaInternalInstance();
        this->socialMedia_ = new SocialMedia(
                                socialMedia->getFacebook(),
                                socialMedia->getInstagram(),
                                socialMedia->getLinkedin(),
                                socialMedia->getTwitter()
                            );
    } else if(typeOfInstance == updateSmCompare) {
        SmP* smP = parentInstance->GetUpdatedSmInternalInstance();
        this->updatedSm_ = new SmP(
                                smP->getId(),
                                smP->getFacebook(),
                                smP->getInstagram(),
                                smP->getTwitter(),
                                smP->getLinkedIn()
                            );
    } else if(typeOfInstance == postCompare) {

        //Then get the internal instance of that class or that actual members of that class.
        PostInput* post_input = parentInstance->GetPostInternalInstance();
        //Then assign your member of your wrapper class to the instance public methods.
        this->currentPost_ = new PostInput(
                                post_input->getTitle(), 
                                post_input->getImage(), 
                                post_input->getDateCreated(), 
                                post_input->getDateUpdated(),
                                post_input->getDeletedInd(),
                                post_input->getPermanentlyDeletedInd(),
                                post_input->getUserId()
                                );

    } else if(typeOfInstance == commentCompare) {

        //Then get the internal instance of that class or that actual members of that class.
        CommentInput* comment_input = parentInstance->GetCommentInternalInstance();
        //Then assign your member of your wrapper class to the instance public methods.
        this->currentComment_ = new CommentInput(
                                comment_input->getUsername(), 
                                comment_input->getBody(), 
                                comment_input->getDateCreated(), 
                                comment_input->getAvatar(),
                                comment_input->getDateUpdated(),
                                comment_input->getDeletedInd(),
                                comment_input->getPermanentlyDeletedInd(),
                                comment_input->getPostId()
                                );

    } else if(typeOfInstance == updateCommentCompare) {
        UpdateC* update_comment = parentInstance->GetUpdatedCommentInternalInstance();

        this->updatedComment_ = new UpdateC(
                                    update_comment->getId(),
                                    update_comment->getUsername(),
                                    update_comment->getBody(),
                                    update_comment->getDateCreated(),
                                    update_comment->getAvatar(),
                                    update_comment->getDateUpdated(),
                                    update_comment->getDeletedInd(),
                                    update_comment->getPermanentlyDeletedInd(),
                                    update_comment->getPostId()
                                );
    } else {
        Napi::TypeError::New(env, "Error!!!!!!!!");
    }

    return;
}

//Determine valid arguments.
bool InputWrapper::DetermineValidArguments(const Napi::CallbackInfo& info, Napi::String registerCompare, Napi::String postCompare, Napi::String updatePostCompare, Napi::String commentCompare, Napi::String updateCommentCompare,
                                            Napi::String userCompare, Napi::String socialMediaCompare, Napi::String updateSmCompare, Napi::String compareValue) {
    Napi::Env env = info.Env();
    //If it's a registerForm value and it contains valid arguments 
    return (
                (
                    info[0].IsString() && compareValue == registerCompare
                    &&  (
                        info[1].IsString() && info[2].IsString() && info[3].IsString() && info[4].IsNumber() && info[5].IsString()
                        && info[6].IsString() && info[7].IsNumber() && info[8].IsNumber()
                        )
                ) 
                || 
                (
                    info[0].IsString() && compareValue == userCompare
                    &&  (
                        info[1].IsString() && info[2].IsString() && info[3].IsString() && info[4].IsNumber() && info[5].IsString()
                        && info[6].IsString() && info[7].IsNumber() && info[8].IsNumber()
                        )
                )
                ||
                (
                    info[0].IsString() && compareValue == socialMediaCompare
                    &&  (info[1].IsString() && info[2].IsString() && info[3].IsString() && info[4].IsString())
                )
                ||
                (
                    info[0].IsString() && compareValue == updateSmCompare
                    &&  (info[1].IsString() && info[2].IsString() && info[3].IsString() && info[4].IsString() && info[5].IsString())
                )
                ||
                //post value and it contains valid arguments
                (                    
                    info[0].IsString() && compareValue == postCompare 
                    &&  (info[1].IsString() && info[2].IsString() && info[3].IsString() && info[4].IsString() && info[5].IsNumber() && info[6].IsNumber() && info[7].IsString())
                ) 
                || 
                //update post and value and it contain valid arguments
                (
                    info[0].IsString() && compareValue == updatePostCompare 
                    &&  (info[1].IsString() && info[2].IsString() && info[3].IsString() && info[4].IsString() && info[5].IsString() && info[6].IsNumber() && info[7].IsNumber() && info[8].IsString())
              
                )
                ||
                //comment value and it contains valid arguments
                (
                    info[0].IsString() && compareValue == commentCompare
                    &&  (
                            info[1].IsString() && info[2].IsString() && info[3].IsString() && info[4].IsString() && info[5].IsString() 
                            && info[6].IsNumber() && info[7].IsNumber() && info[8].IsString()
                        )
                )
                ||
                (
                    info[0].IsString() && compareValue == updateCommentCompare
                    &&  (
                            info[1].IsString() && info[2].IsString() && info[3].IsString() && info[4].IsString() && info[5].IsString() && info[6].IsString()
                            && info[7].IsNumber() && info[8].IsNumber() && info[9].IsString()
                        )
                )

            );
}

void InputWrapper::CreateRegisterFormInstance(const Napi::CallbackInfo& info) {
    //Define your values.
    Napi::String username = info[1].As<Napi::String>();

    Napi::String password = info[2].As<Napi::String>();

    Napi::String avatar = info[3].As<Napi::String>();

    Napi::Number age = info[4].As<Napi::Number>();
    
    Napi::String dateRegistered = info[5].As<Napi::String>();

    Napi::String dateUpdated = info[6].As<Napi::String>();
    
    Napi::Number deletedInd = info[7].As<Napi::Number>();

    Napi::Number permanentlyDeletedInd = info[8].As<Napi::Number>();
    
    //Assign a new RegisterFOrm class instance/
    this->registerForm_ = new RegisterForm(username, password, avatar, age, dateRegistered, dateUpdated, deletedInd, permanentlyDeletedInd);

    return;
}

void InputWrapper::CreateSocialMediaInstance(const Napi::CallbackInfo& info) {
    Napi::String facebook = info[1].As<Napi::String>();

    Napi::String instagram = info[2].As<Napi::String>();

    Napi::String linkedin = info[3].As<Napi::String>();

    Napi::String twitter = info[4].As<Napi::String>();

    this->socialMedia_ = new SocialMedia(facebook, instagram, linkedin, twitter);
    
    return;
}

void InputWrapper::CreateUpdatedSmInstance(const Napi::CallbackInfo& info) {
    Napi::String id = info[1].As<Napi::String>();

    Napi::String facebook = info[2].As<Napi::String>();

    Napi::String instagram = info[3].As<Napi::String>();

    Napi::String twitter = info[4].As<Napi::String>();

    Napi::String linkedin = info[5].As<Napi::String>();

    this->updatedSm_ = new SmP(id, facebook, instagram, twitter, linkedin);

    return;
}

void InputWrapper::CreateUserInstance(const Napi::CallbackInfo& info) {
    //Define your values.
    Napi::String id = info[1].As<Napi::String>();

    Napi::String username = info[2].As<Napi::String>();

    Napi::String avatar = info[3].As<Napi::String>();

    Napi::Number age = info[4].As<Napi::Number>();
    
    Napi::String dateRegistered = info[5].As<Napi::String>();

    Napi::String dateUpdated = info[6].As<Napi::String>();
    
    Napi::Number deletedInd = info[7].As<Napi::Number>();
    
    Napi::Number permanentlyDeletedInd = info[8].As<Napi::Number>();

    //Assign a new User class instance/
    this->user_ =  new User(id, username, avatar, age, dateRegistered, dateUpdated, deletedInd, permanentlyDeletedInd);

    return;
}


void InputWrapper::CreatePostInputInstance(const Napi::CallbackInfo& info) {
    //Define your values.
    Napi::String title = info[1].As<Napi::String>();

    Napi::String image = info[2].As<Napi::String>();

    Napi::String dateCreated = info[3].As<Napi::String>();

    Napi::String dateUpdated = info[4].As<Napi::String>();

    Napi::Number deletedInd = info[5].As<Napi::Number>();
    
    Napi::Number permanentlyDeletedInd = info[6].As<Napi::Number>();

    Napi::String userId = info[7].As<Napi::String>();

    //Define a new instance of the PostInput class.
    this->currentPost_ = new PostInput(title, image, dateCreated, dateUpdated, deletedInd, permanentlyDeletedInd, userId);

    return;
}

void InputWrapper::CreateUpdatePostInstance(const Napi::CallbackInfo& info) {
    //Define your values.
    Napi::String id = info[1].As<Napi::String>();

    Napi::String title = info[2].As<Napi::String>();

    Napi::String image = info[3].As<Napi::String>();

    Napi::String dateCreated = info[4].As<Napi::String>();

    Napi::String dateUpdated = info[5].As<Napi::String>();

    Napi::Number deletedInd = info[6].As<Napi::Number>();
    
    Napi::Number permanentlyDeletedInd = info[7].As<Napi::Number>();

    Napi::String userId = info[8].As<Napi::String>();

    //Define a new instance of the PostInput class.
    this->updatedPost_ = new UpdateP(id, title, image, dateCreated, dateUpdated, deletedInd, permanentlyDeletedInd, userId);

    return;
}

void InputWrapper::CreateCommentInputInstance(const Napi::CallbackInfo& info) {
    //Define your values.
    Napi::String username = info[1].As<Napi::String>();

    Napi::String body = info[2].As<Napi::String>();

    Napi::String dateCreated = info[3].As<Napi::String>();

    Napi::String avatar = info[4].As<Napi::String>();

    Napi::String dateUpdated = info[5].As<Napi::String>();
    
    Napi::Number deletedInd = info[6].As<Napi::Number>();
    
    Napi::Number permanentlyDeletedInd = info[7].As<Napi::Number>();
    
    Napi::String postId = info[8].As<Napi::String>();

    //Assign a new isntance of the CommentInput class.
    this->currentComment_ = new CommentInput(username, body, dateCreated, avatar, dateUpdated, deletedInd, permanentlyDeletedInd, postId);

    return;
}

void InputWrapper::CreateUpdatedCommentInstance(const Napi::CallbackInfo& info) {
    Napi::String id = info[1].As<Napi::String>();

    Napi::String username = info[2].As<Napi::String>();
    
    Napi::String body = info[3].As<Napi::String>();

    Napi::String dateCreated = info[4].As<Napi::String>();

    Napi::String avatar = info[5].As<Napi::String>();

    Napi::String dateUpdated = info[6].As<Napi::String>();

    Napi::Number deletedInd = info[7].As<Napi::Number>();

    Napi::Number permanentlyDeletedInd = info[8].As<Napi::Number>();

    Napi::String postId = info[9].As<Napi::String>();

    this->updatedComment_ = new UpdateC(id, username, body, dateCreated, avatar, dateUpdated, deletedInd, permanentlyDeletedInd, postId);

    return;
}

RegisterForm* InputWrapper::GetUserInternalInstance() {
    return this->registerForm_;
}

SocialMedia* InputWrapper::GetSocialMediaInternalInstance() {
    return this->socialMedia_;
}

SmP* InputWrapper::GetUpdatedSmInternalInstance() {
    return this->updatedSm_;
}
    
User* InputWrapper::GetUserInfoInternalInstance() {
    return this->user_;
}


PostInput* InputWrapper::GetPostInternalInstance() {
    return this->currentPost_;
}

UpdateP* InputWrapper::GetUpdatePostInternalInstance() {
    return this->updatedPost_;
}

CommentInput* InputWrapper::GetCommentInternalInstance() {
    return this->currentComment_;
}

UpdateC* InputWrapper::GetUpdatedCommentInternalInstance() {
    return this->updatedComment_;
}

    