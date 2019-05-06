#include <napi.h>

namespace Utils {
    Napi::Object Init(Napi::Env env, Napi::Object exports);
    Napi::Object DeepCopy(const Napi::CallbackInfo& info);
}
