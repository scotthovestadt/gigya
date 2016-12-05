import crypto = require('crypto');

export class SigUtils {
    protected secret: string;
    protected secretBase64: Buffer;

    constructor(secret: string) {
        this.secret = secret;
        this.secretBase64 = new Buffer(secret, 'base64');;
    }

    public calcSignature(baseString: string): string {
        if (!this.secret) {
            throw new Error('Cannot calculate signature, secret key not set!');
        }
        const secret = new Buffer(this.secret, 'base64');
        return crypto.createHmac('sha1', secret).update(baseString).digest('base64');
    }

    public validateUserSignature(UID: string, timestamp: number, signature: string): boolean {
        var baseString = `${timestamp}_${UID}`;
        var expectedSig = this.calcSignature(baseString);
        return expectedSig === signature;
    }

    public validateFriendSignature(UID: string, timestamp: number, friendUID: string, signature: string): boolean {
        var baseString = timestamp + '_' + friendUID + '_' + UID;
        var expectedSig = this.calcSignature(baseString);
        return expectedSig === signature;
    }

    /**
     * Write the result to cookie: 'gltexp_${APIKey}'.
     */
    public getDynamicSessionSignature(gltCookie: string, timeoutInSeconds: number): string {
        const loginToken = gltCookie.split('|')[0];
        const expirationTimeUnix = Math.round((Date.now() / 1000) + timeoutInSeconds);
        const unsignedExpString = loginToken + '_' + expirationTimeUnix;
        const signedExpString = this.calcSignature(unsignedExpString);
        return expirationTimeUnix + '_' + signedExpString;
    }
}

export default SigUtils;
