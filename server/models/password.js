// Definition of the document type and basic operations on debts.
var cozydb = require('cozydb');

var Password = cozydb.getModel('Password', {
    /*
     This is the name of the
     */
    'name': {
        default: '',
        type: String
    },

    /*
     This is the identifier of the registered password
     */
    'login': {
        default: '',
        type: String
    },

    /*
     This is the encrypted password
     */
    'password': {
        default: '',
        type: String
    },

    /*
     Optional field of the website url
     */
    'website': {
        default: '',
        type: String
    }
});


// Make this model available from other files.
module.exports = Password;