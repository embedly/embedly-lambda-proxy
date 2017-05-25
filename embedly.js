'use strict';

const AWS = require('aws-sdk');
const request = require('request');
const querystring = require('querystring');
const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

// TODO: add your API KEY
const API_KEY = '<YOUR API KEY>';

const getUrl = (method, url) => {
  return new Promise((resolve, reject) => {
    db.get({ TableName: 'embedly-urls', Key: {url, method}}, function(err, data) {
        if (err) {
          reject(err);
        }
        else {
          if (data.Item && data.Item.json){
            resolve(JSON.parse(data.Item.json))
          } else {
            resolve(null);
          }
        }
      });
  });
};

const putUrl = (method, url, data) => {
  return new Promise((resolve, reject) => {
    db.put({ TableName: 'embedly-urls', Item: {url, method, json: JSON.stringify(data) }}, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
};

const api = (method, url) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.embedly.com/1/${method}`,
      qs: {
        url: url,
        key: API_KEY
      },
      headers: {
        accept: 'application/json'
      }
    };

    request(options, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

const pull = (method, url) => {
  return getUrl(method, url)
    .then((data)=> {
      if (data){
        return {
          hit: 1,
          data
        };
      }
      return api(method, url)
        .then((data)=>{
          return putUrl(method, url, data);
        })
        .then((data) => {
          return {
            hit: 0,
            data
          };
        });
    });
};

module.exports.oembed = (url) => {
  return pull('oembed', url);
};

module.exports.extract = (url) => {
  return pull('oembed', url);
};
