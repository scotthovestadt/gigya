import request = require('request');
import ProxyHttpRequest from '../interfaces/proxy-http-request';
import GigyaResponse from '../interfaces/gigya-response';
import fs = require('fs');
import path = require('path');

let certificate: string;
function getCertificate(): string {
    if (!certificate) {
        certificate = fs.readFileSync(path.join(__dirname, '../../../assets/cacert.pem')).toString();
    }
    return certificate;
}

/**
 * Make HTTP request to Gigya.
 */
export const httpRequest: ProxyHttpRequest = <R>(endpoint: string, host: string, requestParams: any) => {
    return new Promise<GigyaResponse & R>((resolve, reject) => {
        const uri = `https://${host}/${endpoint}`;
        request.post(uri, {
            method: 'post',
            form: requestParams,
            ca: getCertificate()
        }, (error, response, body) => {
            if (error) {
                reject(error);
            }
            try {
                resolve(JSON.parse(body));
            } catch (ex) {
                reject(ex);
            }
        });
    });
}

export default httpRequest;
