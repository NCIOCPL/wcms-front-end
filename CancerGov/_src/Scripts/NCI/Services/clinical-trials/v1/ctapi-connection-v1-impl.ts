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

    /**
     * Temporary method to retrieve JSON from dev tier.
     * TODO: get rid of this once the 'diseases' API endpoint is working.
     * 
     * @param {any} params 
     * @returns {Promise<any>} 
     * @memberof CTAPIConnectionV1Impl
     */
    getDiseasesMocks(params) : Promise<any> {

        console.log(params);

        // TODO: fix this - not everything should be going to cancer_root        
        let filePath = "../../../../publishedcontent/Files/Configuration/cts_menu/";
        if(params.menuType == 'disease' && params.disease_parent_id == null)
            filePath += 'cancer_root.json';
        else
            filePath += ('cancer_' + params.disease_parent_id + '.json');
            

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