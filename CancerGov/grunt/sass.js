/*****************************************
 *  SASS Preprocessing
 ****************************************/
module.exports = function (grunt, options) {
  var dirs = options.dirs;

    var assetFunctions = require('node-sass-asset-functions');
        path = require('path'),
        fs = require('fs'),
        crypto = require('crypto');

  // create an array of all the folders under /NCI//Modules
  var Modules = grunt.file.expand({ filter: 'isDirectory'},dirs.src.scripts + '/NCI/Modules/*');

  return {
    options: {
      includePaths: Modules,
      functions: assetFunctions({
          images_path: '/dist/Images/',
          http_images_path: '/',
          asset_cache_buster: function(http_path, real_path, done){
              var extname = path.extname(http_path),
                  basename = path.basename(http_path, extname),
                  digest = options.fingerprint,
                  new_name = basename + '.__v' + digest + extname;

              done({path: path.join(path.dirname(http_path), new_name), query: null});
          }
      })
    },
    dev: {
      options: {
        sourceMap: true,
        includePaths: (function(){
          return Modules.concat(['_src/StyleSheets/environments/dev']);
        })()
      },
      files: [
        {
          dest: dirs.tmp.styles + 'nvcg.css',
          src: dirs.src.styles + 'nvcg.scss'
        },
        {
          dest: dirs.tmp.styles + 'micro1.css',
          src: dirs.src.styles + 'micro1.scss'
        },        
        {
          dest: dirs.tmp.styles + 'ctsPrintResults.css',
          src: dirs.src.styles + 'ctsPrintResults.scss'
        }
      ]
    },
    prod: {
      options: {
        sourceMap: false,
        outputStyle: 'compressed',
          includePaths: (function(){
            return Modules.concat(['_src/StyleSheets/environments/prod']);
          })()
      },
      files: [
        {
          dest: dirs.tmp.styles + 'nvcg.css',
          src: dirs.src.styles + 'nvcg.scss'
        },
        {
          dest: dirs.tmp.styles + 'micro1.css',
          src: dirs.src.styles + 'micro1.scss'
        },        
        {
          dest: dirs.tmp.styles + 'ctsPrintResults.css',
          src: dirs.src.styles + 'ctsPrintResults.scss'
        }
      ]
    }
  }
};