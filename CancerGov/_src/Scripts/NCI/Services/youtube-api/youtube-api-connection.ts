
/**
 * Interface for clinical trials API connections
 */
export interface YouTubeAPIConnection {

    getRequest(path:string, params: any): Promise<any>

}