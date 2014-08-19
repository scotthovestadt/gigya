var _ = require('underscore')._,
    async = require('async'),
    querystring = require('querystring'),
    crypto = require('crypto'),
    EventEmitter = require('events').EventEmitter,
    request = require('request');

var Gigya = function Gigya(apiKey, secret, useHttps, apiDomain, doHttpRequest) {
  var self = this;

  // Global configuration.
  self.conf = {
    format: 'json'
  };
  if(secret) {
    // If secret is passed, we have an APIKey+Secret combination.
    self.conf.apiKey = apiKey;
    self.conf.secret = secret;
  } else {
    // Otherwise, it's an access token.
    self.conf.oauth_token = apiKey;
  }

  // If HTTPS is not explicitly set to false, default to true.
  // There are some methods that aren't compatible with HTTP.
  self.useHttps = useHttps === true ? true : false;

  // API domain can be switched for the EU data center or to proxy requests through your own server.
  self.apiDomain = apiDomain ? apiDomain : 'socialize.us1.gigya.com';

  // Can be overridden to make HTTP requests directly.
  self.doHttpRequest = doHttpRequest ? doHttpRequest : false;

  // Attempt to load cURL
  var Curl;
  try {
    Curl = require('node-curl/lib/Curl')
  } catch(e){}

  // Used to encode a query string value in the same way Gigya does for base string compatibility when generating signatures.
  var rfc3986 = function(str) {
    if(str === undefined || str === null) {
      str = '';
    }
    if(str === true) {
      str = 'true';
    }
    if(str === false) {
      str = 'false';
    }
    return encodeURIComponent(str)
      .replace(/!/g,'%21')
      .replace(/\*/g,'%2A')
      .replace(/\(/g,'%28')
      .replace(/\)/g,'%29')
      .replace(/'/g,'%27');
  };

  // Used internally to create an API call. If callback is passed, uses traditional node callback style.
  // Otherwise, event emitter style is used.
  var apiCall = function(endpoint, params, callback, retries, emitter) {
    // Create EventEmitter
    if(!emitter) {
      emitter = new EventEmitter();
    }

    // Merge params with global configuration and stringify objects & arrays
    params = _.extend({}, self.conf, params);
    _.each(params, function(value, index) {
      if(_.isArray(value) || _.isObject(value)) {
        params[index] = JSON.stringify(value);
      }
    });

    // We're going to construct the query string and base URL as 2 separate pieces and merge them together when we're done
    // The query string may be modified to provide authentication parameters
    var baseUrl = self.apiDomain + '/' + endpoint;
    if(self.useHttps) {
      // HTTPS requests include the secret already so we just need to append https:// and stringify the query string parameters
      baseUrl = 'https://' + baseUrl;
    } else {
      baseUrl = 'http://' + baseUrl;

      // If secret not provided, we assume other authentication method is being used
      if(params.secret) {
        // Signed HTTP requests must remove the secret and instead provide an OAuth1 signature, timestamp and nonce
        delete params.secret;
        params = _.extend(params, self.SigUtils.constructOAuth1Sig(baseUrl, params));
      }
    }

    // Called if request ends in error
    var handleError = function(err) {
      // Retry if general server error or database error
      if(err.code === 50001 || err.code === 500028) {
        retries = !_.isNumber(retries) ? 1 : retries + 1;
        if(retries < 5) {
          return apiCall(endpoint, params, callback, retries, emitter);
        }
      }

      if(callback) callback(err, null);
      emitter.emit('err', err);
    };

    // Called if request is returned successfully but may still contain an error code
    var handleResponse = function(response) {
      // Parse Gigya's JSON response
      var json;
      if(_.isString(response)) {
        try {
          json = JSON.parse(response);
        } catch(e) {
          return handleError(new Error('JSON parse error'));
        }
      } else {
        json = response;
      }

      // Look for Gigya error code
      if(json.errorCode != 0) {
        var e = new Error(json.errorDetails);
        e.code = json.errorCode;
        e.url = url;
        e.callId = json.callId;
        if(!_.isUndefined(json.validationErrors)) {
          e.validationErrors = json.validationErrors;
        }
        return handleError(e);
      }

      // No error, pass on response
      if(callback) callback(null, json);
      emitter.emit('response', null, json);
    };

    // HTTP requests are done through cURL as it's (as of Node 0.10) much more reliable for many concurrent HTTP requests then Node
    var url = baseUrl + '?' + querystring.stringify(params);
    if(self.doHttpRequest) {
      self.doHttpRequest(url, function(err, response) {
        if(err) {
          handleError(err);
        } else {
          handleResponse(response);
        }
      });
    } else if(Curl) {
      var curl = new Curl();
      curl.setopt('URL', url);
      curl.setopt('SSL_VERIFYPEER', '0');
      var response = '';

      // on 'data' must be returns chunk.length, or means interrupt the transfer
      curl.on('data', function(chunk) {
        response += chunk.toString();
        return chunk.length;
      });

      // end and error must call curl.close()
      curl.on('end', function() {
        curl.close();
        handleResponse(response);
      });
      curl.on('error', function(err) {
        curl.close();
        handleError(err);
      });
      curl.perform();
    } else {
      request(url, function(err, response, body) {
        if(err) {
          handleError(err);
          return;
        }

        handleResponse(body);
      });
    }

    // EventEmitter
    return emitter;
  };

  // Used internally to create and parse an API call to reporting.
  // We want to automatically transform the 'data' array into an object.
  var reportApiCall = function(endpoint, params, callback) {
    params.dataFormat = 'json';
    return apiCall(endpoint, params, function(err, response) {
      if(err) {
        return callback(err, null);
      }

      // Bug: Report headers array doesn't handle spaces in parameters correctly.
      _.each(response.headers, function(value, index) {
        if(_.isString(value)) {
          response.headers[index] = value.trim();
        }
      });

      // Transform data from array to associative object.
      var data = [];
      _.each(response.data, function(row) {
        var objRow = {};
        _.each(row, function(value, columnIndex) {
          var column = response.headers[columnIndex];
          objRow[column] = value;
        });
        data.push(objRow);
      });
      response.data = data;

      callback(null, response);
    });
  };

  // Used internally to create API calls to query APIs.
  var queryApiCall = function(endpoint, originalParams, callback) {
    var emitter = new EventEmitter();

    // We don't want to modify the original object
    params = _.clone(originalParams);

    // Each individual response is combined into one response
    var allResponse = {
      results: callback ? [] : undefined, // Results are only held in memory if callback is defined
      totalCount: undefined,
      objectsCount: 0,
      errorCode: 0,
      callId: ''
    },
    cursorId = undefined,
    fetchAll = params.fetchAll === false ? false : true;

    // Do not send SDK parameter to Gigya
    delete params.fetchAll;

    async.whilst(
      // Keep looping until there are no more cursors returned by Gigya
      // cursorId starts as undefined and only goes false if no cursor was returned in a response
      // If fetchAll === false the cursorId will be false after the first loop
      function () { return cursorId !== false; },

      function(loop) {
        // The user may want to manually paginate, don't always fetch all results
        if(fetchAll === true) {
          // Object may have been modified in the last loop -- remove modifications
          delete params.openCursor;
          delete params.cursorId;

          if(!cursorId) {
            // Ask Gigya to open cursor
            params.openCursor = true;
          } else {
            // Append last cursor to request
            params.cursorId = cursorId; 

            // You must either supply a query OR a cursorId
            delete params.query;
          }
        }

        apiCall(endpoint, params, function(err, response) {
          if(err) {
            loop(err);
            return;
          }

          // We're only interested in holding onto everything when we'll be firing a callback.
          if(callback) {
            allResponse.results = allResponse.results.concat(response.results);
          }

          // Call IDs will be appended.
          allResponse.callId += response.callId + ' ';

          // Global objects count needs to include the objects in this chunk.
          allResponse.objectsCount += response.objectsCount;
          allResponse.totalCount = response.totalCount

          // Loop through each result and emit
          if(_.isArray(response.results)) {
            for(var i = 0; i < response.results.length; i++) {
              emitter.emit('result', response.results[i]);
            }
          }

          // Set cursorId if available, otherwise false will end the loop
          cursorId = response.nextCursorId && fetchAll === true ? response.nextCursorId : false;

          loop();
        });
      },

      // When finished...
      function(err) {
        if(err) {
          emitter.emit('err', err);
          if(callback) callback(err, null);
          return;
        }
        emitter.emit('end', allResponse);
        if(callback) callback(null, allResponse);
      }
    );

    return emitter;
  };

  self.SigUtils = {};
  self.SigUtils.calcSignature = function(baseString) {
    // Calculate base64 encoded HMAC SHA1 hashed base string.
    if(!self.conf.secret) throw 'Cannot calculate signature, secret key not set!';
    var secret = new Buffer(self.conf.secret, 'base64');
    return crypto.createHmac('sha1', secret).update(baseString).digest('base64');
  };
  self.SigUtils.validateUserSignature = function(UID, timestamp, signature) {
    var baseString = timestamp + '_' + UID;
    var expectedSig = self.SigUtils.calcSignature(baseString);
    return (expectedSig === signature);
  };
  self.SigUtils.validateFriendSignature = function(UID, timestamp, friendUID, signature) {
    var baseString = timestamp + '_' + friendUID + '_' + UID;
    var expectedSig = self.SigUtils.calcSignature(baseString);
    return (expectedSig === signature);
  };
  self.SigUtils.constructOAuth1Sig = function(baseUrl, params) {
    var authentication = {};

    // Construct the signature base string from the HTTP method, URL and sorted parameters
    authentication.timestamp = Math.round((new Date().getTime() / 1000));
    authentication.nonce = new Date().getTime();

    // The signature base string is &-joined and includes the request method, base URL, and sorted/encoded query string parameters
    var baseString = [
      'GET',
      rfc3986(baseUrl),
      Object.keys(params).sort().map(function(key) {
        return escape(rfc3986(key)) + '%3D' + escape(rfc3986(params[key]))
      }).join('%26')
    ].join('&');

    // Construct signature from base string
    authentication.sig = self.SigUtils.calcSignature(baseString);

    return authentication;
  };

  self._apiCall = apiCall;

  self.socialize = {};
  self.socialize.checkin = function(params, callback) {
    return apiCall('socialize.checkin', params, callback);
  }
  self.socialize.deleteAccount = function(params, callback) {
    return apiCall('socialize.deleteAccount', params, callback);
  }
  self.socialize.delUserSettings = function(params, callback) {
    return apiCall('socialize.delUserSettings', params, callback);
  }
  self.socialize.exportUsers = function(params, callback) {
    return apiCall('socialize.exportUsers', params, callback);
  }
  self.socialize.facebookGraphOperation = function(params, callback) {
    return apiCall('socialize.facebookGraphOperation', params, callback);
  }
  self.socialize.getAlbums = function(params, callback) {
    return apiCall('socialize.getAlbums', params, callback);
  }
  self.socialize.getAuthValidationData = function(params, callback) {
    return apiCall('socialize.getAuthValidationData', params, callback);
  }
  self.socialize.getAvailableProviders = function(params, callback) {
    return apiCall('socialize.getAvailableProviders', params, callback);
  }
  self.socialize.getContacts = function(params, callback) {
    return apiCall('socialize.getContacts', params, callback);
  }
  self.socialize.getFeed = function(params, callback) {
    return apiCall('socialize.getFeed', params, callback);
  }
  self.socialize.getFriendsInfo = function(params, callback) {
    return apiCall('socialize.getFriendsInfo', params, callback);
  }
  self.socialize.getPhotos = function(params, callback) {
    return apiCall('socialize.getPhotos', params, callback);
  }
  self.socialize.getPlaces = function(params, callback) {
    return apiCall('socialize.getPlaces', params, callback);
  }
  self.socialize.getRawData = function(params, callback) {
    return apiCall('socialize.getRawData', params, callback);
  }
  self.socialize.getReactionsCount = function(params, callback) {
    return apiCall('socialize.getReactionsCount', params, callback);
  }
  self.socialize.getSessionInfo = function(params, callback) {
    return apiCall('socialize.getSessionInfo', params, callback);
  }
  self.socialize.getTopShares = function(params, callback) {
    return apiCall('socialize.getTopShares', params, callback);
  }
  self.socialize.getUserInfo = function(params, callback) {
    return apiCall('socialize.getUserInfo', params, callback);
  }
  self.socialize.getUserSettings = function(params, callback) {
    return apiCall('socialize.getUserSettings', params, callback);
  }
  self.socialize.logout = function(params, callback) {
    return apiCall('socialize.logout', params, callback);
  }
  self.socialize.notifyLogin = function(params, callback) {
    return apiCall('socialize.notifyLogin', params, callback);
  }
  self.socialize.notifyRegistration = function(params, callback) {
    return apiCall('socialize.notifyRegistration', params, callback);
  }
  self.socialize.publishUserAction = function(params, callback) {
    return apiCall('socialize.publishUserAction', params, callback);
  }
  self.socialize.removeConnection = function(params, callback) {
    return apiCall('socialize.removeConnection', params, callback);
  }
  self.socialize.sendNotification = function(params, callback) {
    return apiCall('socialize.sendNotification', params, callback);
  }
  self.socialize.setStatus = function(params, callback) {
    return apiCall('socialize.setStatus', params, callback);
  }
  self.socialize.setUID = function(params, callback) {
    return apiCall('socialize.setUID', params, callback);
  }
  self.socialize.setUserInfo = function(params, callback) {
    return apiCall('socialize.setUserInfo', params, callback);
  }
  self.socialize.setUserSettings = function(params, callback) {
    return apiCall('socialize.setUserSettings', params, callback);
  }
  self.socialize.shortenURL = function(params, callback) {
    return apiCall('socialize.shortenURL', params, callback);
  }
  self.socialize.getToken = function(params, callback) {
    return apiCall('socialize.getToken', params, callback);
  }

  self.comments = {};
  self.comments.getStreamInfo = function(params, callback) {
    return apiCall('comments.getStreamInfo', params, function(err, response) {
      if(err) {
        callback(err, null);
        return;
      }

      _.each(response.streamInfo, function(stream, i) {
        response.streamInfo[i].streamType = _.isUndefined(stream.avgRatings) ? 'comments' : 'reviews';
      });
      callback(null, response);
    });
  }
  self.comments.getComments = function(params, callback) {
    return apiCall('comments.getComments', params, callback);
  }
  self.comments.deleteComment = function(params, callback) {
    return apiCall('comments.deleteComment', params, callback);
  }
  self.comments.flagComment = function(params, callback) {
    return apiCall('comments.flagComment', params, callback);
  }
  self.comments.getTopRatedStreams = function(params, callback) {
    return apiCall('comments.getTopRatedStreams', params, callback);
  }
  self.comments.getTopStreams = function(params, callback) {
    return apiCall('comments.getTopStreams', params, callback);
  }
  self.comments.getUserComments = function(params, callback) {
    return apiCall('comments.getUserComments', params, callback);
  }
  self.comments.getUserOptions = function(params, callback) {
    return apiCall('comments.getUserOptions', params, callback);
  }
  self.comments.setStreamInfo = function(params, callback) {
    return apiCall('comments.setStreamInfo', params, callback);
  }
  self.comments.setUserOptions = function(params, callback) {
    return apiCall('comments.setUserOptions', params, callback);
  }
  self.comments.subscribe = function(params, callback) {
    return apiCall('comments.subscribe', params, callback);
  }
  self.comments.unsubscribe = function(params, callback) {
    return apiCall('comments.unsubscribe', params, callback);
  }
  self.comments.vote = function(params, callback) {
    return apiCall('comments.vote', params, callback);
  }
  self.comments.postComment = function(params, callback) {
    return apiCall('comments.postComment', params, callback);
  }
  self.comments.search = function(params, callback) {
    return queryApiCall('comments.search', params, callback);
  }

  self.reports = {};
  self.reports.getSocializeStats = function(params, callback) {
    return reportApiCall('reports.getSocializeStats', params, callback);
  }
  self.reports.getFeedStats = function(params, callback) {
    return reportApiCall('reports.getFeedStats', params, callback);
  }
  self.reports.getCommentsStats = function(params, callback) {
    return reportApiCall('reports.getCommentsStats', params, callback);
  }
  self.reports.getChatStats = function(params, callback) {
    return reportApiCall('reports.getChatStats', params, callback);
  }
  self.reports.getGMStats = function(params, callback) {
    return reportApiCall('reports.getGMStats', params, callback);
  }
  self.reports.getGMTopUsers = function(params, callback) {
    return reportApiCall('reports.getGMTopUsers', params, callback);
  }
  self.reports.getGMUserStats = function(params, callback) {
    return reportApiCall('reports.getGMUserStats', params, callback);
  }
  self.reports.getIRank = function(params, callback) {
    return reportApiCall('reports.getIRank', params, callback);
  }
  self.reports.getReactionsStats = function(params, callback) {
    return reportApiCall('reports.getReactionsStats', params, callback);
  }

  self.gm = {};
  self.gm.getActionsLog = function(params, callback) {
    return apiCall('gm.getActionsLog', params, callback);
  }
  self.gm.getChallengeConfig = function(params, callback) {
    return apiCall('gm.getChallengeConfig', params, callback);
  }
  self.gm.getChallengeStatus = function(params, callback) {
    return apiCall('gm.getChallengeStatus', params, callback);
  }
  self.gm.getTopUsers = function(params, callback) {
    return apiCall('gm.getTopUsers', params, callback);
  }
  self.gm.notifyAction = function(params, callback) {
    return apiCall('gm.notifyAction', params, callback);
  }
  self.gm.redeemPoints = function(params, callback) {
    return apiCall('gm.redeemPoints', params, callback);
  }
  self.gm.resetLevelStatus = function(params, callback) {
    return apiCall('gm.resetLevelStatus', params, callback);
  }

  self.ds = {};
  self.ds.delete = function(params, callback) {
    return apiCall('ds.delete', params, callback);
  }
  self.ds.get = function(params, callback) {
    return apiCall('ds.get', params, callback);
  }
  self.ds.getSchema = function(params, callback) {
    return apiCall('ds.getSchema', params, callback);
  }
  self.ds.search = function(params, callback) {
    return queryApiCall('ds.search', params, callback);;
  }
  self.ds.setSchema = function(params, callback) {
    return apiCall('ds.setSchema', params, callback);
  }
  self.ds.store = function(params, callback) {
    return apiCall('ds.store', params, callback);
  }

  self.accounts = {};
  self.accounts.deleteAccount = function(params, callback) {
    return apiCall('accounts.deleteAccount', params, callback);
  }
  self.accounts.deleteScreenSet = function(params, callback) {
    return apiCall('accounts.deleteScreenSet', params, callback);
  }
  self.accounts.finalizeRegistration = function(params, callback) {
    return apiCall('accounts.finalizeRegistration', params, callback);
  }
  self.accounts.getAccountInfo = function(params, callback) {
    return apiCall('accounts.getAccountInfo', params, callback);
  }
  self.accounts.getPolicies = function(params, callback) {
    return apiCall('accounts.getPolicies', params, callback);
  }
  self.accounts.getSchema = function(params, callback) {
    return apiCall('accounts.getSchema', params, callback);
  }
  self.accounts.getScreenSets = function(params, callback) {
    return apiCall('accounts.getScreenSets', params, callback);
  }
  self.accounts.importAccount = function(params, callback) {
    return apiCall('accounts.importAccount', params, callback);
  }
  self.accounts.importProfilePhoto = function(params, callback) {
    return apiCall('accounts.importProfilePhoto', params, callback);
  }
  self.accounts.initRegistration = function(params, callback) {
    return apiCall('accounts.initRegistration', params, callback);
  }
  self.accounts.isAvailableLoginID = function(params, callback) {
    return apiCall('accounts.isAvailableLoginID', params, callback);
  }
  self.accounts.linkAccounts = function(params, callback) {
    return apiCall('accounts.linkAccounts', params, callback);
  }
  self.accounts.login = function(params, callback) {
    return apiCall('accounts.login', params, callback);
  }
  self.accounts.logout = function(params, callback) {
    return apiCall('accounts.logout', params, callback);
  }
  self.accounts.notifyLogin = function(params, callback) {
    return apiCall('accounts.notifyLogin', params, callback);
  }
  self.accounts.publishProfilePhoto = function(params, callback) {
    return apiCall('accounts.publishProfilePhoto', params, callback);
  }
  self.accounts.register = function(params, callback) {
    return apiCall('accounts.register', params, callback);
  }
  self.accounts.resendVerificationCode = function(params, callback) {
    return apiCall('accounts.resendVerificationCode', params, callback);
  }
  self.accounts.resetPassword = function(params, callback) {
    return apiCall('accounts.resetPassword', params, callback);
  }
  self.accounts.search = function(params, callback) {
    return queryApiCall('accounts.search', params, callback);
  }
  self.accounts.setAccountInfo = function(params, callback) {
    return apiCall('accounts.setAccountInfo', params, callback);
  }
  self.accounts.setPolicies = function(params, callback) {
    return apiCall('accounts.setPolicies', params, callback);
  }
  self.accounts.setSchema = function(params, callback) {
    return apiCall('accounts.setSchema', params, callback);
  }
  self.accounts.setScreenSet = function(params, callback) {
    return apiCall('accounts.setScreenSet', params, callback);
  }

  self.chat = {};
  self.chat.getMessages = function(params, callback) {
    return apiCall('chat.getMessages', params, callback);
  }
  self.chat.postMessage = function(params, callback) {
    return apiCall('chat.postMessage', params, callback);
  } 

  self.gcs = {};
  self.gcs.search = function(params, callback) {
    return apiCall('gcs.search', params, callback);
  }
}

module.exports = Gigya;