
/*------------------------------------------------------------------------------------------------
   * @ file        : customPlugIn.js
   * @ description : Here we are creating the custom plugIns accourding to the application need.
   * @ author      : Duddukuri Mahesh
   * @ date        :
-------------------------------------------------------------------------------------------------*/

`use strict`;

// Include internal modules.
const configs = require(`../Configs`);
const env     = require(`../env`);
const app     = configs.app[env.instance];

var custom_Init = {
  register: (server, options, next) => {
    console.log(`CUSTOM PLUGIN: (1) ************** LOADING Init index route. *************`);
    // Init the index route.
    server.route({
      method: `GET`,
      path: `/`,
      handler: (request, reply) => {
        return reply({
            name     : app.name,
            endpoint : app.host,
            port     : app.port
        }).code(201);
      }
    });
    // call next() to signal hapi that your plugin has done the job.
    next()
  }
}

custom_Init.register.attributes = {
  name: `index-route`,
  version: `1.0.0`
}

module.exports = custom_Init
