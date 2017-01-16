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

export const httpRequest: ProxyHttpRequest = <R>(endpoint: string, dataCenter: any, requestParams: any) => {
    return new Promise<GigyaResponse & R>((resolve, reject) => {
        const namespace = endpoint.substring(0, endpoint.indexOf('.'));
        const uri = `https://${namespace}.${dataCenter}.gigya.com/${endpoint}`;
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
