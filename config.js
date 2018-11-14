/*
* Config for application
*
*/

const config ={};

//
config.staging ={
  'httpPort':3080,
  'httpsPort':3443,
  'envName':'dev'
};
config.production ={
  'httpPort':5080,
  'httpsPort':5443,
  'envName':'dev'
};

// Check if NODE_ENV has value and send config based on the value if none send staging as default
console.log(`Current NODE_ENV is ${typeof(process.env.NODE_ENV)}`)
const currEnv = typeof(process.env.NODE_ENV)=='string' ?process.env.NODE_ENV.toLowerCase():"" ;
console.log(`Current currEnv is ${currEnv}`)

const exportEnv = typeof(config[currEnv]) == 'object' ?config[currEnv] : config.staging ;
console.log(`Current exportEnv is ${JSON.stringify(exportEnv)}`)

// Export the config based on the NODE_ENV
module.exports = exportEnv ;
