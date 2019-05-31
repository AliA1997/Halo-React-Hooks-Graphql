{
    "targets": [{
        "target_name": "utils",
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "sources": [
            "cppsrc/main.cpp",
            "cppsrc/src/classes/commentInput.cpp",
            "cppsrc/src/classes/updateC.cpp",
            "cppsrc/src/classes/socialMedia.cpp",
            "cppsrc/src/classes/smP.cpp",
            "cppsrc/src/classes/postInput.cpp",
            "cppsrc/src/classes/updateP.cpp",
            "cppsrc/src/classes/registerForm.cpp",
            "cppsrc/src/classes/user.cpp",
            "cppsrc/src/classes/inputWrapper.cpp",
            "cppsrc/src/utils.cpp"
        ],
        'include_dirs': [
            "<!@(node -p \"require('node-addon-api').include\")"
        ],
        'libraries': [],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    }]
}