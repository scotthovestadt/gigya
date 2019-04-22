Gigya JavaScript REST SDK
==============

<img width="620" src="https://cloud.githubusercontent.com/assets/1831484/20920767/1a0acc7e-bb56-11e6-802f-31ed45a91768.png">

<img width="498" src="https://cloud.githubusercontent.com/assets/1831484/20920781/2581495c-bb56-11e6-9206-dd7fd162f82f.png">

<img width="541" src="https://cloud.githubusercontent.com/assets/1831484/20920780/25703306-bb56-11e6-91c8-6566736a2ccf.png">


## Support and Usage
This is an open source SDK for Gigya's REST API. Please do not contact Gigya support with questions or concerns about this SDK. For any issues, please make an issue on GitHub.

## Installation
Gigya is listed on NPM. To install, run the following command within your project folder:
```
npm install gigya
```

## Usage Guide
Please follow these steps to integrate Gigya within your Node JS application:
- Install the SDK
- <a href="http://developers.gigya.com/010_Developer_Guide#API_Key_and_Site_Setup">Obtain an API Key and Secret Key from Gigya</a>
- Include the Gigya module within your project.
- <a href="http://developers.gigya.com/040_Demos/010_Social_Identity_Management/010_Social_Login/001_Basic_Social_Login">Login the user to acquire their UID</a>
- <a href="https://github.com/Gigya-Inc/node-gigya/blob/master/README.md#sending-a-request">Use Gigya's API to send requests</a>

## Sending a Request
After you have logged in the user, you may use Gigya's API to access the user's profile and perform various activities. The following example demonstrates fetching a user's profile.
````js
// Include Gigya's SDK
import Gigya from 'gigya';

// Initialize SDK with your API Key and Secret.
const gigya = new Gigya('YOUR_API_KEY', 'YOUR_DATA_CENTER', 'YOUR_SECRET');

// or:

// Initialize SDK with your API Key, User Key, and User Secret.
const gigya = new Gigya('YOUR_API_KEY', 'YOUR_DATA_CENTER', 'YOUR_USER_KEY', 'YOUR_USER_SECRET');

// or:

// Initialize without keys and pass to each method.
const gigya = new Gigya();

// Fetch user's account.
// Returns a Promise. Promise is thrown on error.
const response = await gigya.accounts.getAccountInfo({
  UID: 'PUT-UID-HERE'
});

// Act on account.
console.log(response.UID);
````

## Without using TypeScript

````js
// Include Gigya's SDK
var Gigya = require('gigya').Gigya;

// Initialize SDK with your API Key and Secret.
const gigya = new Gigya('YOUR_API_KEY', 'YOUR_DATA_CENTER', 'YOUR_SECRET');
````

## Gigya Front-End
For your front-end implementation, check out [Gigya Markup](https://github.com/scotthovestadt/gigya-markup)!
