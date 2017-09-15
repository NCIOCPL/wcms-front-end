/**
 * Abstract base class for all NCI Enhancements, Pages and Components.
 */
export abstract class NCIBaseControl {

    /**
     * Indicator if the enhancement has been initialized or not.
     */
    private isInitialized: boolean;

    /**
     * Base constructor must be called in derrived class.
     */
    constructor() {
        this.isInitialized = false;
    }

    /**
     * Abstract method defining code to run for initialization
     */
    protected abstract initialize(): void;

    /**
     * Public initialization method.  May only be called once.
     */
    init():void {
        
        if(this.isInitialized)
            return;

        this.initialize();

        this.isInitialized = true;		
    }

    /************************************************
     * This section contains helper methods and functions
     * that should apply to ALL pages and enhancements.
     ************************************************/

    /**
     * Determines if this control/page is in debug mode.
     * This is probably not the best place for this, but
     * it is the best we have.
     * 
     * @protected
     * @type {boolean}
     * @memberof NCIBaseEnhancement    
     * 
     */
    protected isDebug(): boolean {
      let isDebug = false;
      let dbgStr = this.getQueryParameterByName('debug');
      if (dbgStr != undefined && dbgStr.toLowerCase() == "true") isDebug = true;
      return isDebug;
    }

    /**
     * Gets the first value of a query parameter from a url.
     * Pulled from: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
     * 
     * @protected
     * @param {string} name The name of the query parameter
     * @param {string} name The url (Optional) (Default: window.location.href)
     * @memberof NCIBaseEnhancement
     */
    protected getQueryParameterByName(name:string, url?:string):string {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


}