import crypto = require('crypto');
// import sortKeys = require('sort-keys');

import BaseParams from './interfaces/base-params';

const URL = require('url').URL;

/**
 * This class is a utility class with static methods for calculating and validating cryptographic signatures.
 */
export class SigUtils {
    protected secret: string;

    constructor(secret?: string) {
        this.secret = secret as string; // Fix when TypeScript properly recognizes if (!this.secret && !secret) line 17.
    }

    /**
     * This is a utility method for generating a cryptographic signature.
     */
    public calcSignature(baseString: string, secret?: string): string {
        if (!this.secret && !secret) {
            throw new Error('Cannot calculate signature, secret key not set!');
        }
        const secretBuffer = new Buffer(secret || this.secret, 'base64');
        return crypto.createHmac('sha1', secretBuffer).update(baseString).digest('base64');
    }

    /**
     * Use this method to verify the authenticity of a socialize.getUserInfo API method response, to make sure that it is in fact originating from Gigya, and prevent fraud.
     */
    public validateUserSignature(UID: string, timestamp: number, signature: string, secret?: string): boolean {
        var baseString = `${timestamp}_${UID}`;
        var expectedSig = this.calcSignature(baseString, secret);
        return expectedSig === signature;
    }

    /**
     * Use this method to verify the authenticity of a socialize.getFriendsInfo API method response, to make sure that it is in fact originating from Gigya, and prevent fraud.
     */
    public validateFriendSignature(UID: string, timestamp: number, friendUID: string, signature: string, secret?: string): boolean {
        var baseString = `${timestamp}_${friendUID}_${UID}`;
        var expectedSig = this.calcSignature(baseString, secret);
        return expectedSig === signature;
    }

    /**
     * Use this method as part of implementing dynamic control over login session expiration, in conjunction with assigning the value '-1' to the sessionExpiration parameter.
     * 
     * Write the result to cookie: 'gltexp_${apiKey}'.
     */
    public getDynamicSessionSignature(gltCookie: string, timeoutInSeconds: number, secret?: string): string {
        const loginToken = gltCookie.split('|')[0];
        const expirationTimeUnix = Math.round((Date.now() / 1000) + timeoutInSeconds);
        const unsignedExpString = loginToken + '_' + expirationTimeUnix;
        const signedExpString = this.calcSignature(unsignedExpString, secret);
        return `${expirationTimeUnix}_${signedExpString}`;
    }

    /**
     * Use this method to obtain an OAuth signature for use in signing a request to the REST API.
     */
    public getOAuth1Signature(key: string, httpMethod: string, url: string, requestParams: BaseParams & { [key: string]: any; }) {
        var baseString = this.calcOAuth1BaseString(httpMethod, url, requestParams);
        
        return this.calcSignature(baseString, key);
    }

    /**
     * This method calculates the base string used to generate the signature
     */
    protected calcOAuth1BaseString(httpMethod: string, url: string, requestParams: any = {}) {
        var normalizedUrl = "";
    
        const u = new URL(url);
    
        var protocol = u.protocol;
    
        normalizedUrl = `${protocol}//`;
    
        normalizedUrl += u.host.toLowerCase();
    
        normalizedUrl += u.pathname;
        
        var amp = "";
        var queryString = "";
        var sortedParams = this.sortByKey(requestParams);

        // Create a sorted list of query parameters
        for (const key of Object.keys(sortedParams)) {
            var value = sortedParams[key];
    
            if (value !== false && value !== "0" && value === "") {
                value = "";
            }
    
            if (value === false) {
                value = 0
            }
    
            if (value === true) {
                value = 1
            }
    
            queryString += `${amp}${key}=${this.urlEncode(value)}`;
            amp = "&";
        };
    
        // Construct the base string from the HTTP method, the URL and the parameters
        const baseString = `${httpMethod.toUpperCase()}&${this.urlEncode(normalizedUrl)}&${this.urlEncode(queryString)}`;
    
        return baseString;
    }

    /**
     * This method URL encodes any "~" characters present in a given string
     */
    protected urlEncode(toEncode: any = {}) {
        if (toEncode === "") {
            return toEncode;
        } else {
            toEncode = encodeURIComponent(toEncode).replace("%7E", "~");
        }
    
        return toEncode;
    }

    /**
     * This method alphabetocally sorts key/value objects by their keys
     */
    protected sortByKey(objectToSort: any = {}) {
        const seenInput = new Array();
        const seenOutput = new Array();

        const seenIndex = seenInput.indexOf(objectToSort);

        if (seenIndex !== -1) {
            return seenOutput[seenIndex];
        }

        const result: { [s: string]: string; } = {};
        const keys = Object.keys(objectToSort).sort();

        seenInput.push(objectToSort);
        seenOutput.push(result);

        for (const key of keys) {
            const value = objectToSort[key];
            result[key] = value;
        }

        return result;
    }
}

export default SigUtils;
