import {NCIBaseControl} from './nci-base-control';


/**
 * Abstract base class for NCI Pages
 */
export abstract class NCIBasePage extends NCIBaseControl {

    /**
     * Base constructor must be called in derrived class.
     */
    constructor() {
        super();
    }  


  /**
   * Wires up the required enhancements onReady
   * 
   * @abstract
   * @memberof BaseCTSSearchPage
   */
  public abstract onReady(): void;


  /**
   * This initializes this page.  This will attach the onReady events to the dom. 
   * 
   * NOTE: This should not be overridden unless you know why you are doing it and
   * can explain your reasons.
   * 
   * @protected
   * @abstract
   * @memberof NCIBasePage
   */
  protected initialize() {
    //Attach the ready event
    $(this.onReady.bind(this));

    //In the Future, attach additional even handlers.
  }

}