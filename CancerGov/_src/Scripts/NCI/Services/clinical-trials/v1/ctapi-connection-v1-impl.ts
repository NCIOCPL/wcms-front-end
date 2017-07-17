import { CTAPIConnection } from '../';
import axios from 'axios';


/**
 * Interface for clinical trials v1 API connections
 */
export class CTAPIConnectionV1Impl implements CTAPIConnection {

    private protocol: string;    
    private hostname: string;
    private port: number;

    constructor(protocol: string, hostname: string, port?:number) {
        this.protocol = protocol;
        this.hostname = hostname;
        this.port = port;
    }

    getRequest(path:string, params: any): Promise<any> {
        let port:string = this.port ? `:${this.port}` : '';
        let reqURL: string = `${this.protocol}://${this.hostname}${port}/v1/${path}`;
        
        return axios.get(
            reqURL, 
            {
                params: params
            }
        );
    }

}