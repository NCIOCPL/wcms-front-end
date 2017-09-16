/**
 * Declaration for the CDEConfig module.  The actual CDEConfig module is an externally defined UMD module.
 * 
 * Example definition:
 * 
 *   // Uses AMD or browser globals to create a module.
 *   
 *   // Based on https://github.com/umdjs/umd/blob/master/templates/amdWeb.js
 *   
 *   // Defines a module "cdeConfig" that has no dependencies.
 *   // Note that the name of the module is implied by the file name. It is best
 *   // if the file name and the exported global have matching names.
 *   
 *   // If you do not want to support the browser global path, then you
 *   // can remove the `root` use and the passing of `this` as the first arg to
 *   // the top function.
 *   
 *   (function (root, factory) {
 *       if (typeof define === 'function' && define.amd) {
 *           // AMD. Register as an anonymous module.
 *           define(factory);
 *       } else {
 *           // Browser globals
 *           root.cdeConfig = factory();
 *       }
 *   }(this, function () {
 *       // Just return a value to define the module export.
 *       // This example returns an object, but the module
 *       // can return a function as the exported value.
 *       return {
 *           'environmentConfig': {
 *               'www.cancer.gov': {
 *                   configItem1: 'value1',
 *                   configItem2: 'value2'
 *               },
 *               'www-stage.cancer.gov': {
 *                   configItem2: 'value2-a'
 *               }
 *           }
 *       };
 *   }))
 *   
 */
declare module "CDEConfig" {
    export = CDEConfig;
}

declare const CDEConfig : any;
