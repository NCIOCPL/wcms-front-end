/*****************************************
 *  SASS Preprocessing
 ****************************************/
module.exports = function (grunt, options) {
  var dirs = options.dirs;

  // create an array of all the folders under /NCI//Modules
  var Modules = grunt.file.expand({ filter: 'isDirectory'},dirs.src.scripts + '/NCI/Modules/*');

  return {
    options: {
      includePaths: Modules
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
          dest: dirs.tmp.styles + 'ctsPrintResults.css',
          src: dirs.src.styles + 'ctsPrintResults.scss'
        }
      ]
    }
  }
};