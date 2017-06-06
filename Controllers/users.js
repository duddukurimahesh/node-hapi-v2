/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : Includes all users controller operations.
   * @ author      : Duddukuri Mahesh
   * @ date        :
-----------------------------------------------------------------------*/

`use strict`;

/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/

const Utils    = require(`../Utils`);
const Services = require(`../Services`);

module.exports = {

    register       : (request, callback) => Services.users.register(request, callback),        // register User.
};
