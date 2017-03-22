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
        sourceMap: true
      },
      files: [
        {
          dest: dirs.tmp.styles + 'nvcg.css',
          src: dirs.src.styles + 'nvcg.scss'
        }
      ]
    },
    prod: {
      options: {
        sourceMap: false,
        outputStyle: 'compressed'
      },
      files: [
        {
          dest: dirs.tmp.styles + 'nvcg.css',
          src: dirs.src.styles + 'nvcg.scss'
        }
      ]
    }
  }
};