'use strict';

const embedly = require('./embedly.js');

/** Generic wrappers**/
const error = function(callback, code, msg){
  callback(null, {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin" : "*",
    },
    body: JSON.stringify({
      error: true,
      message: msg
    })
  });
};

const success = function(callback, result){
  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "X-Cache-Hit": result.hit
    },
    body: JSON.stringify(result.data)
  });
};

module.exports.oembed = (event, context, callback) => {
  const url = event.queryStringParameters && event.queryStringParameters.url;

  if (!url){
    error(callback, 422, 'URL required');
  }

  embedly.oembed(url)
    .then((data)=>{
      success(callback, data);
    })
    .catch((err)=>{
      error(callback, 422, err);
    });
};


module.exports.extract = (event, context, callback) => {
  const url = event.queryStringParameters && event.queryStringParameters.url;

  if (!url){
    error(callback, 422, 'URL required');
  }

  embedly.extract(url)
    .then((data)=>{
      success(callback, data);
    })
    .catch((err)=>{
      error(callback, 422, err);
    });
};
