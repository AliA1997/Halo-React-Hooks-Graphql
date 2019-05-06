#include "actualclass.h"
#include <string>
#include <napi.h>

ActualClass::ActualClass(double value, std::string nameOfClass, std::string userOfClass){
    this->value_ = value;
    this->nameOfClass_ = nameOfClass;
    this->userOfClass_ = userOfClass;
}

double ActualClass::getValue()
{
  return this->value_;
}

std::string ActualClass::getName() {
  return this->nameOfClass_;
}

std::string ActualClass::getUserOfClass() {
  return this->userOfClass_;
}

double ActualClass::add(double value)
{
  this->value_ += value;
  return this->value_;
}

Napi::Object ActualClass::returnObj(Napi::Env env) {
  Napi::Object objToReturn = Napi::Object::New(env);

  Napi::String doubleKey = Napi::String::New(env, "double");
  Napi::Number doubleValue = Napi::Number::New(env, this->value_);

  Napi::String nameKey = Napi::String::New(env, "name");
  Napi::String nameValue = Napi::String::New(env, this->nameOfClass_);

  Napi::String userKey = Napi::String::New(env, "user");
  Napi::String userValue = Napi::String::New(env, this->userOfClass_);

  objToReturn.Set(doubleKey, doubleValue);
  objToReturn.Set(nameKey, nameValue);
  objToReturn.Set(userKey, userValue);

  return objToReturn;
}
