Embedly Lambda Proxy
====================
This is not meant to be a production service, just an example of using Amazon
Lambda to create a proxy to Embedly's API.

Install
-------
This uses [serverless](https://serverless.com/) to deploy code to lambda

```
npm install -g serverless
npm install
```

Serverless needs AWS Creds to deploy, so add them to your `.bash_profile`

```
export AWS_ACCESS_KEY_ID=YOUR_KEY
export AWS_SECRET_ACCESS_KEY=YOUR_SECRET
```

Finally you'll need to edit `embedly.js` and add your API_KEY.

Deploy
------
Just run `serverless deploy`. Severless should output the following:

```
Serverless: Packaging service...
...
endpoints:
  GET - https://{id}.execute-api.us-east-1.amazonaws.com/dev/oembed
  GET - https://{id}.execute-api.us-east-1.amazonaws.com/dev/extract
functions:
  oembed: aws-nodejs-dev-oembed
  extract: aws-nodejs-dev-extract
```

You can now use these endpoints

```
window.fetch('https://{id}.execute-api.us-east-1.amazonaws.com/dev/oembed?url=http://embed.ly')
  .then((r)=> r.json())
  .then(console.log)
```

done.
