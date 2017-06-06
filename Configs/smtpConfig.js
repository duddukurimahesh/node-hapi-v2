
/*-----------------------------------------------------------------------
   * @ file        : smtpConstants.js
   * @ description : Includes all the smtp (mail) settings.
   * @ author      : Duddukuri Mahesh
   * @ date        :
-----------------------------------------------------------------------*/

`use strict`;

module.exports = {

    dev: {
        
        smtpUser   : ``,
        smtpPass   : ``,
        smtpPort   : 587,//25,
        smtpServer : `smtp.gmail.com`,
        mailFrom   : `project_name`,
        // gmail credentials used for temporary purpose
        username: `abc@gmail.com`,
        password: `abc123`
    },

    staging_dev    :{

        smtpUser   : ``,
        smtpPass   : ``,
        smtpPort   : 587,//25,
        smtpServer : `smtp.gmail.com`,
        mailFrom   : `project_name`,
        // gmail credentials used for temporary purpose
        username: `abc@gmail.com`,
        password: `abc123`
    },

    staging_test   : {

        smtpUser   : ``,
        smtpPass   : ``,
        smtpPort   : 587,//25,
        smtpServer : `smtp.gmail.com`,
        mailFrom   : `project_name`,
        // gmail credentials used for temporary purpose
        username: `abc@gmail.com`,
        password: `abc123`
    },

    live: {

        smtpUser   : ``,
        smtpPass   : ``,
        smtpPort   : 587,//25,
        smtpServer : `smtp.gmail.com`,
        mailFrom   : `project_name`,
        // gmail credentials used for temporary purpose
        username: `abc@gmail.com`,
        password: `abc123`
    }

};
