Unofficial Gigya Node SDK
==============

##Support and Usage
This is an unofficial SDK for Gigya's REST API. It is not an officially supported product. Use at your own risk.

##Installation
Gigya is listed on NPM. To install, run the following command within your project folder:
```
npm install gigya
```

##Usage Guide
Please follow these steps to integrate Gigya within your NodeJS application:
- Install the SDK
- <a href="http://developers.gigya.com/010_Developer_Guide#API_Key_and_Site_Setup">Obtain an API Key and Secret Key from Gigya</a>
- Include the Gigya module within your project: `var Gigya = require('gigya');`
- <a href="http://developers.gigya.com/040_Demos/010_Social_Identity_Management/010_Social_Login/001_Basic_Social_Login">Login the user to acquire their UID</a>
- <a href="https://github.com/Gigya-Inc/node-gigya/blob/master/README.md#sending-a-request">Use Gigya's API to send requests</a>

##Sending a Request
After you have logged in the user, you may use Gigya's API to access the user's profile and perform various activities. The following example demonstrates fetching a user's profile.
```
// Include Gigya's SDK
var Gigya = require('gigya');

// Initialize SDK with your API Key and Secret Key
var gigya = new Gigya('YOUR_API_KEY', 'YOUR_SECRET_KEY');

// Fetch user's profile with REST API socialize.getUserInfo
// Documentation: http://developers.gigya.com/037_API_reference/010_Socialize/socialize.getUserInfo
gigya.socialize.getUserInfo({
  UID: 'PUT-UID-HERE'
}, function(err, response) {
  if(err) {
    // Request failed, handle error
    return console.error(err);
  }
  
  // Otherwise, print response to console
  console.log(response);
});
```

##Using EventEmitter style callbacks
In addition to node-style callbacks, the SDK also support EventEmitter style callbacks:
```
gigya.socialize.getUserInfo({
  UID: 'PUT-UID-HERE'
}).on('response', function(response) {
  // Print response to console
  console.log(response);
}).on('err', function(err) {
  // Request failed, handle error
  return console.error(err);
});
```

Additionally, accounts.search and ds.search have special support for streaming query response data:
```
gigya.accounts.search({
  query: 'SELECT * FROM accounts'
}).on('result', function(account) {
  // Do something with account...
  console.log(account);
}).on('end', function(summary) {
  // Done streaming
  console.log(summary);
}).on('err', function(err) {
  // Request failed, handle error
  return console.error(err);
});
```
