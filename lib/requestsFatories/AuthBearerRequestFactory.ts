import {DataCenter} from "../interfaces/base-params";
import {GigyaRequest} from "./RequestFactory";
import {AuthRequestFactory, UserKeyCredentials} from "./AuthRequestFactory";

const {JWT, JWK} = require('@panva/jose');

export interface RSACredentials extends UserKeyCredentials {
    privateKey: string;
}

export class AuthBearerRequestFactory extends AuthRequestFactory {
    constructor(apiKey: string | undefined,
                dataCenter: DataCenter,
                protected _creds: RSACredentials) {
        super(apiKey, dataCenter);
    }

    protected sign(request: GigyaRequest<RSACredentials>) {
        const creds = Object.assign({}, this._creds, request.params) as RSACredentials;
        const jwt = this.signJwt(creds);
        request.headers.Authorization = `Bearer ${jwt}`;
    }

    private signJwt(creds: RSACredentials) {
        return JWT.sign(
            {},
            JWK.asKey({
                key: creds.privateKey,
                format: 'pem',
                // type: 'pkcs1'
            }, {
                alg: 'RS256',
                kid: creds.userKey
            }), {
                iat: true,
                jti: this.createNonce().toString(),
                header: {
                    typ: 'JWT'
                }
            }
        );
    }
}