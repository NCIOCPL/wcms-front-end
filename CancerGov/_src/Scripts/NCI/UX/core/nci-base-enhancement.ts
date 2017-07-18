
/**
 * Abstract base class for NCI Enhancements
 */
export abstract class NCIBaseEnhancement {

    /**
     * Indicator if the enhancement has been initialized or not.
     */
    private isInitialized: boolean;

    /**
     * Base constructor must be called in derrived class.
     */
    constructor() {}

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

}