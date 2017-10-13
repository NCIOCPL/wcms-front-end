
/**
 * Represents a single YouTube item (video) in the results of a YouTube API call
 * TODO: - see if it makes more sense to use "playlist" and "video" as names once everything is working
 */
export class YouTubeItem {
    
        /**
         * The unique ID of this video item.
         */
        videoID: string;
    
        /**
         * The title of this video item.
         */
        title: string;

        /**
         * The description of this video item.
         */
        description: string;
        
        /**
         * ID of the playlist that contains this video item.
         */
        playlistID: string;

        /**
         * The link to this video item's default thumbnail image.
         */
        thumbnailURL: string;
        
        /**
         * This video item's position in the parent playlist.
         */
        position: number;
    
        constructor() {
            this.videoID = undefined;
            this.title = undefined;
            this.description = undefined;
            this.playlistID = undefined;
            this.thumbnailURL = undefined;
            this.position = 0;
        }
    
        static fromJSON(json: any) : YouTubeItem {
            if (typeof json === 'string') 
            {
                return JSON.parse(json, YouTubeItem.reviver);
            } 
            else 
            {
                //Create an instance of the InterventionResults class
                let ytItem = new YouTubeItem();
    
                //Loop over source
                Object.keys(json).forEach((key: string) => {
                    switch(key) {
                        case "video_id" : ytItem.videoID = json[key]; break;
                        case "title" : ytItem.title = json[key]; break;
                        case "description" : ytItem.description = json[key]; break;
                        case "playlist_id" : ytItem.playlistID = json[key]; break;
                        case "thumbnail_url" : ytItem.thumbnailURL = json[key]; break;
                        case "position" : ytItem.position = json[key]; break;
                    }
                })
    
                return ytItem;
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
            return key === "" ? YouTubeItem.fromJSON(value) : value;
        }    
    }