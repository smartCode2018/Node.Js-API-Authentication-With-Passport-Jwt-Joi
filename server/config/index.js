const config = {
  production:{
    JWT_SECRET: process.env.SECRET,
      DATABASE: process.env.MONGODB_URI
  },
  default:{
    JWT_SECRET: 'JUSTICEKELECHISECRET123',
      DATABASE: 'mongodb://localhost:27017/API'
  }
}

exports.get = function get(env){
  return config[env] || config.default
}





// if (process.env.NODE_ENV === 'test') {
//     module.exports = {
//       JWT_SECRET: 'JUSTICEKELECHISECRET123',
//       oauth: {
//         google: {
//           clientID: 'number',
//           clientSecret: 'string',
//         },
//         facebook: {
//           clientID: 'number',
//           clientSecret: 'string',
//         },
//       },
//     };
//   } else {
//     module.exports = {
//       JWT_SECRET: 'JUSTICEKELECHISECRET123',
//       oauth: {
//         google: {
//           clientID: 'number',
//           clientSecret: 'string',
//         },
//         facebook: {
//           clientID: 'number',
//           clientSecret: 'string',
//         },
//       },
//     };
//   }