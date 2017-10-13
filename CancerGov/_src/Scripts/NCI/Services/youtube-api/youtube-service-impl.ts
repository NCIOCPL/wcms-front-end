import { YouTubeAPIConnection, YouTubeService, YouTubeItems } from '.';

/**
 * This class represents the methods to accessing a CTAPI service
 */
export class YouTubeServiceImpl implements YouTubeService {

    /**
     * The connection to use for calls.
     */
    private connection: YouTubeAPIConnection;

    /**
     * Create a new instance of a ClinicalTrialsService
     * @param connection The CTAPIConnection to use for interacting with the service.
     * 
     */
    constructor(connection: YouTubeAPIConnection) {
        this.connection = connection;
    }

    /**
     * Gets terms from the terms endpoint
     * Facade -> getYouTubeItems -> getRequest
     * @param termType The term type (REQUIRED)
     * @param additionalParams Optional additional params to use in narrowing endpoint call. Add search text and sorting here. See API for additional params.
     * @param size The number of terms to return. NOTE: API allows max of 100 (DEFAULT: 10)
     * @param from The 0-based offset of where to start fetching terms from. (DEFAULT: 0)
     */
    //getYouTubeItems(termType: string, additionalParams = {}, size = 10, from = 0): Promise<YouTubeItems> {
    getYouTubeItems(additionalParams = {}): Promise<YouTubeItems> {

        //Setup the request
        // TODO: remove these values - these are hardcoded for testing only
        let params = {
            part       : 'snippet',
            playlistId : 'PLYKy4VbxNln61Inca7txbOLqAxJNMZypg',
            key        : 'AIzaSyAc7H6wMKjEqxe2J9iHNnc9OBZhfa6TXN8'
            //         &pageToken=CAUQAA   
        };

        //Merge in any additional params.
        //NOTE: The order matters here as we want to ensure that our params are not overwritten.
        let requestParams = Object.assign({}, additionalParams, params);
        
        //Write a unit test for the request URL

        //Setup additional params for Viewable.

        return this.connection.getRequest(
                '',
                requestParams
            )
            .then((resJSON: any) => {
                return YouTubeItems.fromJSON(resJSON);
            })
    }
}

