export interface GigyaSamlConfig {
    entityID: string;
    certificate: string;
    spAssertionConsumerServiceUrl: string;
    spSingleLogoutServiceUrl: string;
    spMetadataUrl: string;
}

export default GigyaSamlConfig;
