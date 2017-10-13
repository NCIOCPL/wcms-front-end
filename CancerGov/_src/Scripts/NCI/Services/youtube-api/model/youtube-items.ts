import { YouTubeItem } from './youtube-item';

/**
 * Represents a single YouTube playlist item containing a list of YouTube videos.
 * TODO: - see if it makes more sense to use "playlist" and "video" as names once everything is working
 */
export class YouTubeItems {

    /**
     * The unique ID of this playlist.
     */
    playlistID: string;

    /**
     * The number of videos in this playlist.
     */
    totalResults: number;

    /**
     * The number of videos to show per results page of this playlist.
     */
    resultsPerPage: number;

    /**
     * The token parameter value for the next page of results if total results > results per page.
     */
    nextPageToken: string;

    /**
     * The token parameter value for the previous page of results if total results > results per page.
     */
    prevPageToken: string;

    /**
     * Collection of YouTube items (videos).
     */
    items: YouTubeItem[];

    /**
     * Creates an instance of YouTubeItems.
     * @memberof YouTubeItems
     */
    constructor() {
        this.playlistID = undefined;
        this.totalResults = 0;        
        this.resultsPerPage = 0;
        this.nextPageToken = undefined;
        this.prevPageToken = undefined;
        this.items = [];        
    }

    static fromJSON(json: any) : YouTubeItems {
        if (typeof json === 'string') 
        {
            return JSON.parse(json, YouTubeItems.reviver);
        } 
        else 
        {
            //Create an instance of the TermResults class
            let ytItems = Object.create(YouTubeItems.prototype)

            //Copy all the fields from the json object.
            return Object.assign(ytItems, json, {
                //Convert any fields that have different names or need conversion.
                items: json.items.map(
                    (itemJson: any) => { 
                        return YouTubeItem.fromJSON(itemJson); 
                    }
                )
            });
        }
    }

    /**
     * Reviver can be passed as the second parameter to JSON.parse to
     * automatically call User.fromJSON on the resulting value.
     * 
     * @param key 
     * @param value 
     */
    static reviver(key: string, value: any): any {
        return key === "" ? YouTubeItems.fromJSON(value) : value;
    }
}