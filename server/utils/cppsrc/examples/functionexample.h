/*Import macro's, function, and   classes from N-APi and define a interface for your c++ code to follow.*/
#include <napi.h>
namespace functionexample {
  std::string hello();
  std::string returnFullName(std::string firstName, std::string lastName);
  int add(int a, int b);
  int subtract(int a, int b);
  int multiply(int a, int b);
  int divide(int a, int b);
  Napi::String HelloWrapped(const Napi::CallbackInfo& info);
  Napi::String FullNameWrapped(const Napi::CallbackInfo& info);
  /*Remove init add wrapped integar function that will take a callback and new init function */
  Napi::Number AddWrapped(const Napi::CallbackInfo& info);
  //For each function define a wrapper function that will take a CallBackInfo
  Napi::Number SubtractWrapped(const Napi::CallbackInfo& info);
  Napi::Number MultiplyWrapped(const Napi::CallbackInfo& info);
  Napi::Number DivideWrapped(const Napi::CallbackInfo& info);
  Napi::Object Init(Napi::Env env, Napi::Object exports);
}