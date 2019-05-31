const utils = require('../utils/index');
module.exports = {
    getReferenceValue: function(doc, refKey) {
        return doc[refKey].get()
            .then(function(ref) {
                const socialMedia = ref.data();
                return new utils.InputWrapper(
                                            'socialMedia',
                                            socialMedia.facebook,
                                            socialMedia.instagram,
                                            socialMedia.linkedin,
                                            socialMedia.twitter    
                                        ).returnObj('socialMedia');  
            });
    },
    getReferenceId: function(doc, refKey) {
        return doc[refKey].get()
            .then(function(ref) {
                return ref.id;
            });
    },
    determineTypeOfSm: function(updateType, updateValue, smInfo, smId) {

        if(updateType === 'facebook')
            return new utils.InputWrapper(
                                        'update-sm',
                                        smId,
                                        updateValue,
                                        smInfo.instagram,
                                        smInfo.twitter,
                                        smInfo.linkedin                        
                                    ).returnObj('update-sm');
        else if(updateType === 'instagram') 
            return new utils.InputWrapper(
                                            'update-sm',
                                            smId,
                                            smInfo.facebook,
                                            updateValue,
                                            smInfo.twitter,
                                            smInfo.linkedin                        
                                        ).returnObj('update-sm');
        else if(updateType === 'twitter') 
            return new utils.InputWrapper(
                                            'update-sm',
                                            smId,
                                            smInfo.facebook,
                                            smInfo.instagram,
                                            updateValue,
                                            smInfo.linkedin                        
                                        ).returnObj('update-sm');
        else if(updateType === 'linkedin') 
            return new utils.InputWrapper(
                                            'update-sm',
                                            smId,
                                            smInfo.facebook,
                                            smInfo.instagram,
                                            smInfo.twitter,
                                            updateValue                        
                                        ).returnObj('update-sm');

    }
} 