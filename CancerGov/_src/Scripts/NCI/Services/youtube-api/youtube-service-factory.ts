import { YouTubeService, YouTubeServiceImpl, YouTubeAPIConnectionImpl } from '.';

export class YouTubeServiceFactory {

    /**
     * Factory to get an instace of a YouTUbe API Service.
     * @param hostname The hostname of the API 
     * @param protocol The protocol to use to connect to the API (Default: "https")
     * @param port The optional port to use
     */
    static create(hostname:string, protocol="https", port?:number): YouTubeService {

        //TODO: implement this as a dynamic factory so we do not have to hardcode the names of the implementations

        let svc:YouTubeService = null;
        if(hostname != null) {
            let conn:YouTubeAPIConnectionImpl = new YouTubeAPIConnectionImpl(protocol, hostname, port);
            svc = <YouTubeService>new YouTubeServiceImpl(conn);            
        }

        if (svc != null) {
            return svc;
        } else {
            throw new Error("Valid protocol and hostname must be provided to create a YouTube API service");
        }
    }
}