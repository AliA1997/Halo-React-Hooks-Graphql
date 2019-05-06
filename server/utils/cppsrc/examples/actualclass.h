#include <stdio.h>
#include <string>
#include <napi.h>

class ActualClass {
    public: 
        ActualClass(double value, std::string nameOfClass, std::string userOfClass); //Constructor
        double getValue();//Getter for value
        double add(double value);//Add to value.
        std::string getName();
        std::string getUserOfClass();
        Napi::Object returnObj(Napi::Env env);
        // double subtract(double value?)
    private:
        double value_;//Define your private property.
        std::string nameOfClass_;
        std::string userOfClass_;
};