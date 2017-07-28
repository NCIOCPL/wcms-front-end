// What is the purpose of this file???  
// -----------------------------------
// We have implemented our own fetch methods to get results back from the CTAPI.  Therefore, we cannot use the default ajax method.  
// Luckily, Select2 has a system for implementing data adapters that allow use to create our own ways of fetching data.  You can
// find the base class at https://github.com/select2/select2/blob/master/src/js/select2/data/base.js.
//
// So we followed the model of the Ajax adapter located at the same location in order to build the Select2InterventionAdapter.
// 
// Cool, so why is this file not just a Typescript class?
// ------------------------------------------------------
// Yeah, so about that.  There was no way to reference the adapters, nor are there typings.  In fact to get to the Adapter "classes"
// you must call a require method that hangs off the $.fn.select2.amd object in order to get a class definition for us to extend.  
// Furthermore, as that method is asychronous, we wait for it to finish in order to get the definitions.  So that means we cannot define
// our classes at transpile time.  In fact, we cannot define our classes outside of the require callback. :(  Which means we cannot 
// attach a dataAdapter to our select2 instance unless we are inside of the $.fn.select2.amd.require callback.
//
// So this file allows us to both define the Adapter class and initialize an instance of the select2 onto an element that uses our 
// adapter.  (If you can find a cleaner way, feel free)
//  

define(function(require) {
    var $ = require('jquery');
    require('../../../../../../../node_modules/select2');

    //In order to get the autocomplete to only fire once "minimumInputLength" characters have been passed in we must...
    //add in minimumInputLength decorator based on comments in https://stackoverflow.com/questions/30631024/add-decorator-to-data-adapter-in-select2-version-4-x 
    //AND issue https://github.com/select2/select2/issues/3249

    /**
     * Creates an Class definition of a Select2InterventionAdapter
     * TODO: Cache this so we do not create multiple class definitions of the same thing.
     * @param {*} ArrayData The Select2 array adapter that we will be extending.
     * @param {*} MinimumInputLength The Select2 decorator that will wrap our query method and check for a minimum input length if it has been set.
     * @param {*} Utils The Select2 utils function collection used to Extend and Decorate adapters.
     */
    function getAdapterDefinition(ArrayData, MinimumInputLength, Utils) {

        function Select2InterventionAdapter ($element, options) {

            this.adapterOptions = this._applyDefaults(options.get('promise'));

            if (this.adapterOptions.processResults != null) {
                this.processResults = this.adapterOptions.processResults;
            }

            Select2InterventionAdapter.__super__.constructor.call(this, $element, options);
        }

        Utils.Extend(Select2InterventionAdapter, ArrayData);

        Select2InterventionAdapter.prototype._applyDefaults = function (options) {
            var defaults = {

            }

            return $.extend({}, defaults, options, true);
        }
        
        Select2InterventionAdapter.prototype.processResults = function (results) {
            return results;
        }

        Select2InterventionAdapter.prototype.query = function (params, callback) {
            var self = this;
            var term = params.term;

            if (!term) {
                callback(self.processResults({results: []}));
            }

            this.adapterOptions.dataFunction(term)
                .then(function (res) {                                    
                    callback(self.processResults({results: res}));
                })
                .catch(function (err) {
                    console.log(err);
                    self.trigger('results:message', {
                    message: 'errorLoading'
                    });
                });
        };

        return Utils.Decorate(Select2InterventionAdapter, MinimumInputLength);
    }


    /**
     * Initializes select2 on a element, adding a PromiseAdapter 
     * @param {*} $selector The jQuery extended element to attach select2 on.  
     * @param {*} initOptions The select2 options
     */
    var initSelect2Fn = function($selector, initOptions) {

        $.fn.select2.amd.require( ['select2/data/array', 'select2/data/minimumInputLength', 'select2/utils'], function (ArrayData, MinimumInputLength, Utils) {

            //Get the adapter definition
            var Select2InterventionAdapter = getAdapterDefinition(ArrayData, MinimumInputLength, Utils);

            //Set the adapter
            var mergedOpts = $.extend(
                {}, 
                initOptions, 
                {
                    dataAdapter: Select2InterventionAdapter
                }
            );

            console.log($selector.select2(mergedOpts));
        });

    }

    return initSelect2Fn;
});