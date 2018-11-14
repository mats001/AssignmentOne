/*
* Assignment 1 Hello World Api
*
*/
// System Imports
const http= require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const stringDecoder = require('string_decoder').stringDecoder;
// User Imports
const config = require('./config')

// declarations
const httpPort = config.httpPort;
const httpsPort = config.httpsPort;
const currEnv  = config.envName;
// Create http server and listen
const httpServer = http.createServer((req,res)=>{
  server(req,res);
});
httpServer.listen(httpPort,()=>{
  console.log(`Started ${currEnv} mode on port ${httpPort}.`)
});
// Create https server and lisetn
const httpsOptions = {
  //"key":fs.readFileSync('./../https/key.pem'),
  //"cert":fs.readFileSync('./../https/cert.pem'),

};
const httpsServer = https.createServer(httpsOptions,(req,res)=>{
  server(req,res);
});
httpsServer.listen(httpsPort,()=>{
  console.log(`Started ${currEnv} mode on port ${httpsPort}.`)
});
// Create server app to porcess request and send response
const server = (req,res)=>{
   let parsedUrl =  url.parse(req.url,true);
   // remove extra slashes
   let path = parsedUrl.pathname.replace(/^\/+|\/+$/g,'') ;
   console.log(`Path is ${path}`);
   // provide for process request heders
   const header = req.header;
   // red request type
   const method = req.method ;
   // provide for processin request  data on post
   req.on('data',(data)=>{
     // process data here
   });
   req.on('end',()=>{
     //procesd end of request
     // based on the path send a response
     // if path is /hello send 'Hello Stranger' with status code 200
     // else send 404
     console.log('reached here',typeof(routes[path]))
     var routeHandler = typeof(routes[path]) !== "undefined" ? routes[path] : handlers.notFound;
     console.log(`Rounte handler is ${routeHandler}`)
     data={};
     routeHandler(data,(statusCode,retData)=>{
        if (statusCode === 200){
          res.end(retData);
        }else{
          res.writeHeader(statusCode)
          res.end();
        }
     });  // <routeHandler complete>
   });   // <on end complete>

};

// routes
const handlers = {};

handlers.hello = (data,callback) =>{
  let retData ="Hello Stranger !!";
  callback(200,retData) ;
};   // <routes.hello complete>
handlers.ping = (data,callback) =>{
  let retData ="";
  callback(200,retData) ;
};   // <routes.ping complete>

// rounte when path not foud
handlers.notFound = (data,callback) =>{
  callback(404,{}) ;
};  // <routes.notFound complete>
// define all routes with called funtions
const routes={
  'hello':handlers.hello,
  'ping':handlers.ping
};
