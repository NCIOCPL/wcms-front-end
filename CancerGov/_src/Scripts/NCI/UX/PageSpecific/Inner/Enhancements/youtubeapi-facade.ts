import 'core-js/fn/array/includes';
import { YouTubeService, YouTubeItem, YouTubeItems} from 'Services/youtube-api';

/**
 * Facade wrapping a 'YouTubeService' instance to create app specific methods
 * and simplify interacting with API.
 */
export class YouTubeAPIFacade {

    private svc:YouTubeService;

    constructor(svc: YouTubeService) {
        this.svc = svc;
    }
 
    getVideos():Promise<YouTubeItem[]> {
        return this.svc.getYouTubeItems(
            // do things
        )
        .then((res:YouTubeItems) => {
            return res.items;
        })
        .then((items:YouTubeItem[]) => {
            return items;
        });
    }

    getVideosNoArg():Promise<YouTubeItem[]> {
        return;
    }

    // From CT API facade for reference 
    // getDiseases(name: string):Promise<DiseaseResult[]> {
    //     return this.svc.getDiseases(
    //         ["maintype", "subtype", "stage"],
    //         undefined,
    //         { 
    //             name: name,
    //             size: 10,
    //             sort: "cancergov",
    //             current_trial_status: VIEWABLE_TRIALS
    //         }
    //     ).then((res:DiseaseResults) => {
    //         return res.terms
    //     }).then((diseases:DiseaseResult[]) => {
    //         //Do cool sorting.
    //         if (this.isDebug) {
    //             diseases.forEach(disease => disease.name += " (" + disease.codes.join("|") + ")")
    //         }
    //         return diseases;
    //     });
    // }


    //Add new get methods as needed, lather, rinse, repeat.
}