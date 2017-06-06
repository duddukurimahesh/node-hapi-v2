
/*-----------------------------------------------------------------------
   * @ file        : appConstants.js
   * @ description : Includes all the app settings.
   * @ author      : Duddukuri Mahesh
   * @ date        :
-----------------------------------------------------------------------*/

`use strict`;

module.exports = {

    dev              : {
        
        name         : `project_name`,
        host         : `127.0.0.1`,
        port         : `9000`,
        socket       : `9004`,
        absolutePath : `${__dirname}/..`,
        debug        : true
    },

    staging_dev      : {

        name         : `project_name`,
        host         : `127.0.0.1`,
        port         : `9001`,
        socket       : `9005`,
        absolutePath : `${__dirname}/..`,
        debug        : true
    },

    staging_test     : {

        name         : `project_name`,
        host         : `127.0.0.1`,
        port         : `9002`,
        socket       : `9006`,
        absolutePath : `${__dirname}/..`,
        debug        : true
    },

    live             : {

        name         : ``,
        host         : ``,
        port         : ``,
        absolutePath : `${__dirname}/..`,
        debug        : true
    }

};

