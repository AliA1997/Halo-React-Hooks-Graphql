#include "myclass.h"

MyClass::MyClass(std::string currentValue) {
    this->name = currentValue;
}

std::string MyClass::getValue() {
    return this->name;
}

std::string MyClass::editValue(std::string newValue) {
    this->name = newValue;
    return this->name;
}

