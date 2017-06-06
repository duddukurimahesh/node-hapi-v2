
/*-----------------------------------------------------------------------
   * @ file        : pushConfig.js
   * @ description : Includes all the push notification settings.
   * @ author      : Duddukuri Mahesh
   * @ date        :
-----------------------------------------------------------------------*/

`use strict`;

module.exports = {

    ios: {

        dev: {

            cert       : `/Certs/cert.pem`,
            key        : `/Certs/key.pem`,
            gateway    : `gateway.sandbox.push.apple.com`
        },

        staging_dev:{

            cert       : `/Certs/cert.pem`,
            key        : `/Certs/key.pem`,
            gateway    : `gateway.sandbox.push.apple.com`
        },

        staging_test: {

            cert       : `/Certs/cert.pem`,
            key        : `/Certs/key.pem`,
            gateway    : `gateway.sandbox.push.apple.com`
        },

        live: {

            cert       : `/Certs/cert.pem`,
            key        : `/Certs/key.pem`,
            gateway    : `gateway.push.apple.com`,
            production : true
        }

    },

    android: {

        dev: {

            SenderID   : ``,
            API_Key    : ``
        },

        staging_dev: {

            SenderID   : ``,
            API_Key    : ``
        },

        staging_test: {

            SenderID   : ``,
            API_Key    : ``
        },

        live: {

            SenderID   : ``,
            API_Key    : ``
        }

    }
}
