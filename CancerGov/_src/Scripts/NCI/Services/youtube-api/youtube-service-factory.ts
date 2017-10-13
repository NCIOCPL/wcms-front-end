import { YouTubeService, YouTubeServiceImpl, YouTubeAPIConnectionImpl } from '.';

export class ClinicalTrialsServiceFactory {

    /**
     * Factory to get an instace of a Clinical Trials Service.
     * @param hostname The hostname of the API 
     * @param version The version of the API to use (Default: "v1")
     * @param protocol The protocol to use to connect to the API (Default: "https")
     * @param port The optional port to use
     */
    static create(hostname:string, version = "v1", protocol="https", port?:number): YouTubeService {

        //TODO: implement this as a dynamic factory so we do not have to hardcode the names of the implementations

        let svc:YouTubeService = null;

        switch(version) {
            case "v1": {
                let conn: YouTubeAPIConnectionImpl = new YouTubeAPIConnectionImpl(protocol, hostname, port);
                svc = <YouTubeService>new YouTubeServiceImpl(conn);            
            }
        }

        if (svc != null) {
            return svc;
        } else {
            throw new Error("You must specify a valid Clinical Trials Service version");        
        }
    }
}