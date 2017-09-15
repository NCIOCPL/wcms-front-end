import {NCIBaseControl} from './nci-base-control';

/**
 * Abstract base class for NCI Enhancements
 */
export abstract class NCIBaseEnhancement extends NCIBaseControl {

    /**
     * Base constructor must be called in derrived class.
     */
    constructor() {
        super();
    }

}