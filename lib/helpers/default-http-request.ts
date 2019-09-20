import request = require('request');
import ProxyHttpRequest from '../interfaces/proxy-http-request';
import GigyaResponse from '../interfaces/gigya-response';
import fs = require('fs');
import path = require('path');
import {Headers} from "request";

let certificate: string;
let verboseHttpError = process.env['GIGYA_VERBOSE_HTTP_LOGGING'];

function getCertificate(): string {
    if (!certificate) {
        certificate = fs.readFileSync(path.join(__dirname, '../../../assets/cacert.pem')).toString();
    }
    return certificate;
}

function log(msg : any) : void {
    if (verboseHttpError) {
        console.log(msg);
    }    
}

/**
 * Make HTTP request to Gigya.
 */
export const httpRequest: ProxyHttpRequest = <R>(endpoint: string, host: string, requestParams: any, headers?: Headers) => {
    let start = Date.now();

    return new Promise<GigyaResponse & R>((resolve, reject) => {
        const uri = `https://${host}/${endpoint}`;
        request.post(uri, {
            method: 'post',
            form: requestParams,
            ca: getCertificate(),
            headers
        }, (error, response, body) => {
            log(`request to ${uri} took ${(new Date().getTime() - start) / 1000} seconds`);
            if (error) {
                log(error);
                reject(error);
            }
            try {
                resolve(JSON.parse(body));
            } catch (ex) {
                log(`failed to parse response body from request to ${uri}\n${body}`);
                reject(ex);
            }
        });
    });
}

export default httpRequest;
