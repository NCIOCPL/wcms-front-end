define(function(require) {
    var $ = require('jquery');
    require('../../../../../../../node_modules/select2');


    /**
     * Creates an Class definition of a Select2InterventionAdapter
     * TODO: Cache this so we do not create multiple class definitions of the same thing.
     * @param {*} ArrayData 
     * @param {*} Utils 
     */
    function getAdapterDefinition(ArrayData, Utils) {

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
                .then((res) => {                                    
                    callback(self.processResults({results: res}));
                })
                .catch((err) => {
                    console.log(err);
                    self.trigger('results:message', {
                    message: 'errorLoading'
                    });
                });
        };

        return Select2InterventionAdapter;
    }


    /**
     * Initializes select2 on a element, adding a PromiseAdapter 
     * @param {*} $selector The jQuery extended element to attach select2 on.  
     * @param {*} initOptions The select2 options
     */
    var initSelect2Fn = function($selector, initOptions) {

        $.fn.select2.amd.require( ['select2/data/array', 'select2/utils'], function (ArrayData, Utils) {

            //Get the adapter definition
            var Select2InterventionAdapter = getAdapterDefinition(ArrayData, Utils);

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