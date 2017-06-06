
/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : This file defines the user schema for mongodb.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

const Mongoose = require ('mongoose');
const Schema   = Mongoose.Schema;
const env = require('../env');

if (env.instance == "dev") {
    Mongoose.set('debug', true); // console mongo queries
}

var UserSchema = new Schema({
    name           : { type: String, required: true },
    phone          : { type: String, required: true },
    email          : { type: String },
    phone_is_verified        : { type: Boolean, default: false },
    email_is_verified        : { type: Boolean, default: false },
    phone_verification_token : { type: String, default: '' },
    email_verification_token : { type: String, default: '' },
    forget_verify_token      : { type: String, default: '' }
});

var user = Mongoose.model ('user', UserSchema);
module.exports = user;
