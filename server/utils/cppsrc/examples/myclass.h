#include <napi.h>

class MyClass {
    //Define your methods and constructor through the public keyword.
    public:
        MyClass(std::string currentValue);
        std::string getValue();
        std::string editValue(std::string stringValue);
    
    //Define your properties or private members of a class through the private keyword.
    private:
        //No need for a pointer.
        std::string name;
}