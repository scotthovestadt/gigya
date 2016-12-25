// Fields marked as optional when not required by setScreenSet.
export interface ScreenSet {
    screenSetID: string;
    html: string;
    css: string;
    metadata?: {
        desc?: string;
        designerHtml: string;
        targetEnv: string;
        lastModified?: string;
        version?: number;
    };
}

export default ScreenSet;
