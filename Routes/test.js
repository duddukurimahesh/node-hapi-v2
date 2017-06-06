
/*-----------------------------------------------------------------------
   * @ file        : utilities.js
   * @ description : Here defines all testing routes.
   * @ author      : Duddukuri Mahesh
   * @ date        :
-----------------------------------------------------------------------*/

'use strict';

/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/
const FCM   = require('fcm').FCM;
const Joi   = require('joi');
const Boom  = require('boom');
const Utils = require('../Utils');

module.exports = [

    /*-------------------------------------
        * test API for sent mails.
     --------------------------------------*/
    /*{
    },*/

    /*-------------------------------------
        * test API for FCM-Notifications.
     --------------------------------------*/
    {
        method: 'POST',
        path: '/v1/utilities/testGCM',
        config: {
            description: 'Test API for FCM notification.',
            notes: 'Test API for FCM notification.',
            tags: ['api','test'],
            validate: {
                payload: {
                    message     : Joi.string().required(),
                    apikey      : Joi.string().required(),
                    deviceToken : Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {

            console.log( '\x1b[36m\x1b[1m','+++++++++++++++++++++++++ test GCM request recieved +++++++++++++++++++++++++' );


            let fcm = new FCM (request.payload.apikey);

            let message = {
                registration_id: request.payload.deviceToken,
                "data.message": request.payload.message
            };

            fcm.send(message, function (err, res) {
                if (err) {
                    reply(err, null);
                } else {
                    reply(null, { message:'Push notification send successfully.',result:res });
                };
            });
        }
    },

    /*-------------------------------------
        * test API for APN-notifications.
     --------------------------------------*/
    {
        method: 'POST',
        path: '/v1/utilities/testAPN',
        config: {
            description: 'Test API for APN.',
            notes: 'Test API for APN.',
            tags: ['api','test'],
            validate: {
                payload: {
                    message: Joi.string().required(),
                    deviceToken: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {

            console.log('\x1b[36m\x1b[1m','+++++++++++++++++++++++++ Test API request recieved +++++++++++++++++++++++++');

            let apn      = require('apn');
            let path     = require('path');
            let configs  = require('../Configs');
            const env    = require('../env');
            const app    = configs.app[env.instance];
            let cert     = path.join(app.absolutePath, '/Certificates/cert.pem');
            let key      = path.join(app.absolutePath, '/Certificates/key.pem');

            let connectionOptions = {           //node apn options
                "cert"          : cert,
                "key"           : key,
                "passphrase"    : null,
                "gateway"       : "gateway.push.apple.com",
                "port"          : 2195,
                "enhanced"      : true,
                "cacheLength"   : 5,
                "errorCallback" : function (err) {
                    console.log('APN error: ',err);
                }
            }, feedbackOptions = {
                "batchFeedback" : true,
                "interval"      : 300,
                "cert"          : cert,
                "key"           : key
            }, apns;

            (function (callback) {

                apns = new apn.Connection(connectionOptions);   //Connection Setup
                var feedbackObj = new apn.Feedback(feedbackOptions);

                feedbackObj.on("feedback", function (devices) {
                    devices.forEach (function (item) {
                        console.log('Recieved notification from device ',item);
                    });
                });

            })();
            (function () {
                console.log('Inside applePushNotifications: sendNotification ');

                var note = new apn.Notification();  //creating a new notification object

                note.expiry = Math.floor(Date.now() / 1000) + (3600*2); // Expires 2 hour from now.
                note.badge = 0;
                note.sound = "ping.aiff";
                note.alert = 'hi mahesh';
                note.device = new apn.Device("request.payload.deviceToken"); // YourDeviceToken here.
                note.payload = {};
                if (apns) {
                    apns.sendNotification (note);
                    reply(true);
                }else
                    reply(false);
            })();
        }
    },

    /*-------------------------------------
        * test api for sending OTP.
     --------------------------------------*/
    {
        method: 'POST',
        path: '/v1/utilities/testSendOtp',
        config: {
            description: 'test SMS.',
            notes: 'test SMS',
            tags: ['api'],
            validate: {
                payload: {
                    phoneNumber: Joi.string().required()
                },
            }
        },
        handler: function (request, reply) {
            var obj = {
                phoneNumber:request.payload.phoneNumber
            };
            Utils.logger.err_log(`This is error message.`,{key1 : `value1`,key2:`value2`});
            reply('error message',null);
            /*Utils.universalfunctions.sendOtp(obj, function (err, res) {
                if (err)
                    reply(err);
                else
                    reply(null, {
                        statusCode: 100,
                        status: "successful",
                        message: "Otp sent successfully.",
                        result: res
                    });
            });*/
        }
    },

    /*-------------------------------------
        * Utility api for Uploading Images.
     --------------------------------------*/
    {
        method: 'POST',
        path: '/v1/utilities/image',
        config: {
            description: 'Utility API for upload image.',
            notes: 'The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>file</b>: This key should carry the Image stram.<br/><br/>Request object should also contain following fields in its <b>Query</b> object<br/>&bull; <b>type</b>: This key should carry the type of image being uploaded for option <b>1</b> for <b>User profile image</b>, <b>2</b> for <b>Vehicle Image</b>, <b>3</b> for <b>Parking Space Image</b>.<br/><br/>Request object should also contain following fields in its <b>headers</b> object<br/>&bull; <b>x-logintoken</b>: The token assigned to the user after successful login',
            tags: ['api'],
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 10485760
            },
            validate: {
                query:{
                    type: Joi.number().required().valid(1, 2, 3,4), // 1 -> User Profile Image , 2 -> Vehicle Image, 3 -> Parking Space Image, 4 -> issues images.
                },
                headers: Joi.object({
                    'x-logintoken': Joi.string().required().label('Login')
                }).options({allowUnknown: true}),
                payload:{
                    image: Joi.any().required().label('Image')
                }
                // },
                // failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: function (request, reply) {

            request.payload.user_id = request.pre.verify.data._id;
            request.payload.type = request.query.type;

            Utils.universalfunctions.uploadProfilePic(request.payload, function(err, res) {
                if (err) {
                    reply(err);
                } else {

                    var response ={
                        statusCode: 200,
                        status: "success",
                        message: "Image uploaded successfully",
                        result: {
                            image : res
                        }
                    };

                    reply(response)
                }
            })
        }
    },


    /*-------------------------------------
        * Utility api for Fetching Image from Asset folder.
     --------------------------------------*/
    {
        method: 'Get',
        path: '/v1/utilities/image',
        config: {
            description: 'Utility API for fetching image.',
            notes: 'Request object should also contain following fields in its <b>Query</b> object<br/>&bull; <b>image</b>: This key should carry the complete image name with extension.',
            tags: ['api'],
            validate: {
                query:{
                    image: Joi.string().required().label('Image'),
                }
            //     },
            //     failAction: Utils.universalfunctions.failActionFunction
            }
        },
        handler: function (request, reply) {

            Utils.universalfunctions.fetchImagePath(request.query.image, function(err, res) {
                if (err) {
                    reply(err);
                } else {
                    return reply.file('./'+res)

                }
            })
        }
    }



];
