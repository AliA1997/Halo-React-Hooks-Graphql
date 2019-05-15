
module.exports = {
    getReferenceValue: function(doc, refValue) {
        return doc[refValue].get()
            .then(function(ref) {
                return ref.data();
            });
    }
} 