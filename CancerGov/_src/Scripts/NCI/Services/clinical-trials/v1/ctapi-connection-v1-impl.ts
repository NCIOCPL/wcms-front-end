import { CTAPIConnection } from '../';
import axios from 'axios';
import { AxiosResponse } from 'axios';


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

    getDiseasesMocks(params) : Promise<any> {
        let filePath = "../../../../publishedcontent/Files/Configuration/cts_menu/cancer_root.json";

        // TODO: fix this - not everything should be going to cancer_root
        // //if (type == disease and parent is null) {
        // if (params.diseaseParentID == "disease" && parent == null) {
        //     filePath = "cancer_root.json";
        // }

        return axios.get(
            filePath
        ).then((res:AxiosResponse) => {
            // TODO: check http response code 
            return { 
                total: 100,
                terms: res.data.map((term:any) => {
                    return {
                        "name" : term.key,
                        "codes" : term.codes,
                        "disease_parent_id" : term.diseaseParentID,
                        "menu" : term.menu
                    }
                })
            }
            //return res.data;
        });        
    }

    getRequest(path:string, params: any): Promise<any> {
        let port:string = this.port ? `:${this.port}` : '';
        let reqURL: string = `${this.protocol}://${this.hostname}${port}/v1${path}`;
 
        if (path == "/diseases") {
            return this.getDiseasesMocks(params);
        }

        return axios.get(
            reqURL, 
            {
                params: params
            }
        ).then((res:AxiosResponse) => {
            // TODO: check http response code 
            return res.data;
        });
    }

}