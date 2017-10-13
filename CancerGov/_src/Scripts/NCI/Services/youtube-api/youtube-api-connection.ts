
/**
 * Interface for YouTube developer API connections
 */
export interface YouTubeAPIConnection {

    getRequest(path:string, params: any): Promise<any>

}