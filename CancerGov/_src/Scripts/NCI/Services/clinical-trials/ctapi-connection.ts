
/**
 * Interface for clinical trials API connections
 */
export interface CTAPIConnection {

    getRequest(path:string, params: any): Promise<any>

}