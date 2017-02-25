export interface ExternalIdP {
    name: string;
    entityID: string;
    singleSignOnServiceUrl: string;
    singleSignOnServiceBinding: string;
    singleLogoutServiceUrl?: string;
    singleLogoutServiceBinding: string;
    nameIDFormat: string;
    attributeMap: { [key: string]: string; };
    certificate: string;
}

export default ExternalIdP;
