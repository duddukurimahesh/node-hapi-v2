
/*---------------------------------------------------------------------------------
   * @ file        : server.js
   * @ description : This is the main startup server file to init the application.
   * @ author      : Duddukuri Mahesh
   * @ date        :
----------------------------------------------------------------------------------*/

`use strict`;

// Include external modules.
const Hapi     = require(`hapi`);
const mongoose = require(`mongoose`);

// Include internal modules.
const plugIns  = require(`./PlugIns`);
const Configs  = require(`./Configs`);
const env      = require(`./env`);
const Utils    = require(`./Utils`);
const app      = Configs.app[env.instance];
const db       = Configs.db [env.instance];
const server   = new Hapi.Server();
const routes   = require(`./Routes`);
const scheduler= require(`./Utils`).scheduler;

// creating REST API server connection.
console.log(app);
server.connection({
    host: app.host,
    port: app.port,
    routes: {
        cors: {
            origin: [`*`],
            additionalHeaders: [`x-logintoken`],
            additionalExposedHeaders: [`x-logintoken`]
        }
    },
    labels: [`api`]
},{
    timeout:{
        server: 10000
    }
});

// creating SOCKET server connection.
server.connection({
    port: app.socket,
    labels: [`ws`]
});

const apiServer = server.select(`api`);

console.log(`\x1b[32m`,"+++ SERVER SETTINGS LOADED +++\r\n" +JSON.stringify(app)  + "\n");

// configure all routes to server object.
server.route(routes);

// register PlugIn`s and Start the server.
server.register(plugIns,function(err) {
    // something bad happened loading the plugin.
    if (err) {
        throw err;
    }
    // start server after all PlugIns registration.
    server.start(function(err) {
        if (err) {
            console.log(`\x1b[31m`,"+++ Error starting server +++");
            throw err;
        } else{
            console.log(`\x1b[32m`, `+++ SERVER STARTED +++\r\nServer running `);
        };
    });
});

/* -----  DB connections section.  -----*/
// Connect to MongoDB section.
// DB options.
const Db_Options = {
    db     : { native_parser: true },
    server : { poolSize: 5 },
    user   : db.username,
    pass   : db.password
}; // Build the connection string.
const mongoUrl = `mongodb://`+db.host+`:`+db.port+`/`+db.name;

// create DB connection.
mongoose.connect(mongoUrl,Db_Options,function(err) {
    if (err) {
        console.log(`\x1b[31m`,"DB Error: "+ err);
        process.exit(1);
    } else{
        scheduler();            //starting the node schedulers.
        console.log(`\x1b[32m`,`MongoDB Connected :`+ mongoUrl);
    }
});
