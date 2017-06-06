
/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : This is the user service which will handle the user CRUD.
   * @ author      : Duddukuri Mahesh
   * @ date        :
-----------------------------------------------------------------------*/

/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/

const Boom   = require('boom');
const async  = require('async');
const jwt    = require('jsonwebtoken');
const path   = require('path')
const fs     = require('fs');
const _      = require('underscore');

const Models  = require('../Models');
const Utils   = require('../Utils');
const Configs = require('../Configs');
const env     = require('../env');
const email_credentials  = Configs.smtp[env.instance];
const logger  = Utils.logger;

module.exports = {

};
