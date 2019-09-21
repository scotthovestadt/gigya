import {GigyaRequest} from "../RequestFactory";
import {AuthRequestSigner, isCredentials, UserKeyCredentials} from "./AuthRequestSigner";

export interface RSACredentials extends UserKeyCredentials {
    privateKey: string;
}

export function isRSACreds(credentials: RSACredentials | any): credentials is RSACredentials {
    return !!credentials.privateKey && isCredentials(credentials);
}

export class AuthBearerSigner extends AuthRequestSigner<RSACredentials> {
    constructor(creds: RSACredentials) {
        super(creds);
    }

    public sign(request: GigyaRequest<RSACredentials>) {
        const jwt = this.signJwt(this._creds);
        request.headers.Authorization = `Bearer ${jwt}`;

        delete request.params.userKey;
        delete request.params.privateKey;
    }

    private signJwt(creds: RSACredentials) {
        const {JWT, JWK} = require('@panva/jose');

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