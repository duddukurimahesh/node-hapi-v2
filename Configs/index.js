
/*-----------------------------------------------------------------------
   * @ file        : index.js
   * @ description : Main module to incluse all the configs.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

`use strict`;

module.exports =  {

    app    : require (`./appConfig`),
    db     : require (`./dbConfig`),
    smtp   : require (`./smtpConfig`),
    consts : require (`./constants`),
    push   : require (`./pushConfig`),
    sms    : require (`./smsConfig`)
};





