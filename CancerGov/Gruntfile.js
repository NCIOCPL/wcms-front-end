module.exports = function(grunt) {

	// Define Dirs
	grunt.config('dirs', {
		src: {
			base: "_src/",
			pages: "_src/PageTemplates/",
			styles: "_src/StyleSheets/",
			scripts: "_src/Scripts/",
		},
		dist: {
			base: "_dist/",
			pages: "_dist/PageTemplates/",
			styles: "_dist/Styles/",
			scripts: "_dist/js/",
		}
	});

	// Project Config
	grunt.config('pkg', grunt.file.readJSON('package.json'));

	// Load Plugins
	/*****************************************
	 *  SVN Repo Updating
	 ****************************************/
	grunt.loadNpmTasks('grunt-svn-fetch');
	grunt.config('svn_fetch', {
		options: {
			'repository': "<%= pkg.repository.url %><%= pkg.repository.branchdir %><%= pkg.repository.devbranch %><%= pkg.repository.subpath %>"
		},
		nvcg: {
			map: {
				"_src": "_src",
			}
		}
	});

	/*****************************************
	 *  SASS Preprocessing
	 ****************************************/
	grunt.loadNpmTasks('grunt-sass');
	grunt.config('sass', {
		options: {
			sourceMap: true,
			outputStyle: 'expanded',
			precision: 5
		},
		dist: {
			files: {
				'<%= dirs.dist.styles %>nvcg.css': '<%= dirs.src.styles %>nvcg.scss'
			}
		}
	});

	/*****************************************
	 *  Build template files
	 ****************************************/
	grunt.loadNpmTasks('grunt-bake');
	grunt.config('bake', {
		build: {
			options: {},
			files: [{
				expand: true,
				cwd: '<%= dirs.src.pages %>',
				src: ['**/*.aspx'],
				dest: '<%= dirs.dist.pages %>',
				ext: ".aspx"
			}]
		}
	});

	/*****************************************
	 *  Move JS Files into place...
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.config('copy', {
		js: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: ['<%= dirs.src.scripts %>**/*.js'],
				dest: '<%= dirs.dist.scripts %>',
				filter: 'isFile'
			}]
		}
	});

	/*****************************************
	 * Require.js
	 * Compile the JavaScript modules into packages.
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.config('requirejs', {
		options: {
			skipDirOptimize: true,
			normalizeDirDefines: 'skip',
			wrapShim: true,
			appDir: '<%= dirs.src.scripts %>',
			dir: '<%= dirs.dist.scripts %>',
			paths: {
				'requirejs': '../../bower_components/requirejs/require',
				'config': 'config'
			},
			mainConfigFile: '<%= dirs.src.scripts %>config.js',
			modules: [
				{
					name: 'app/Common',
					include: [
						'requirejs',
						'config'
					],
					insertRequire: ['app/Common']
				},
				{
					name: 'app/CTHP',
					insertRequire: ['app/CTHP']
				},
				{
					name: 'app/Home',
					insertRequire: ['app/Home']
				},
				{
					name: 'app/Inner',
					insertRequire: ['app/Inner']
				},
				{
					name: 'app/Landing',
					insertRequire: ['app/Landing']
				},
				{
					name: 'app/PDQ',
					insertRequire: ['app/PDQ']
				},
				{
					name: 'app/Topic',
					insertRequire: ['app/Topic']
				}
			]
		},
		dev: {
			options: {
				generateSourceMaps: true,
				optimize: 'none'
			}
		},
		prod: {
			options: {
				optimize: 'uglify2',
				uglify2: {
					output: {
						max_line_len: 500
					}
				}
			}
		}
	});
	var configCleanRequire = {
		requirejs: {
			src: [
				'<%= dirs.dist.scripts %>app/*',
				'!<%= dirs.dist.scripts %>app/*.js',
				'<%= dirs.dist.scripts %>config.js',
				(grunt.config('env') === 'prod' ? '<%= dirs.dist.scripts %>build.txt' : null)
			].filter(function(x) { return x !== null && x !== undefined; })
		}
	};
	if (grunt.config('clean')) {
		grunt.config.merge('clean', configCleanRequire);
	} else {
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.config('clean', configCleanRequire);
	}

	/*****************************************
	 * Uglify JS
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-uglify');
	var oldFiles = {
		expand: true,
		flatten: true,
		dest: '<%= dirs.dist.scripts %>OLD',
		src: ['<%= dirs.src.scripts %>OLD/*.js']
	};
	var modernizrFile = {
		expand: true,
		flatten: true,
		dest: '<%= dirs.dist.scripts %>',
		src: ['<%= dirs.src.scripts %>app/vendor/modernizr.custom.2.7.1.js']
	};
	grunt.config('uglify', {
		options: {
			preserveComments: 'some',
			maxLineLen: 500
		},
		dev: {
			options: {
				mangle: false,
				beautify: true,
				sourceMap: true
			},
			files: [oldFiles, modernizrFile]
		},
		prod: {
			options: {
				mangle: true
			},
			files: [oldFiles, modernizrFile]
		}
	});
	/************************************************************************
	 * TASK: Runs the Server
	 ************************************************************************/
	grunt.loadNpmTasks('grunt-develop');
	grunt.config('develop', {
		server: {
			file: 'server/server.js'
		}
	});
	/*****************************************
	 *  Watch
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.config('watch', {
		options: {
			//liveReload: true
		},
		css: {
			files: '<%= dirs.src.styles %>**/*.scss',
			tasks: ['build-css:' + 'dev']
		},
		js: {
			files: '<%= dirs.src.scripts %>**/*.js',
			tasks: ['build-js:' + 'dev']
		},
		templates: {
			files: ['<%= dirs.src.pages %>*.aspx', '<%= dirs.src.pages %>Includes/*.inc'],
			tasks: ['build-templates:' + 'dev']
		}
	});


	// Tasks
	grunt.registerTask('build-js', 'Build the JavaScript.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['requirejs:' + env, 'clean:requirejs', 'uglify:' + env];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build-css', 'Build the CSS.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['sass'];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build-templates', 'Build the CDE page templates.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['bake'];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build', 'Build all files.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['build-css:' + env, 'build-js:' + env, 'build-templates:' + env];
		grunt.task.run(tasks);
	});


	grunt.registerTask('build-watch', 'Build all files and watch for changes.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['build:' + env, 'develop', 'watch'];
		grunt.task.run(tasks);
	});

	// We should ALWAYS define the 'default' task
	grunt.registerTask('default', ['build']);

	// Deploy task is used by the build script
	grunt.registerTask('deploy', ['build:prod']);
};
