module.exports = function(grunt) {

	// Define Dirs
	grunt.config('dirs', {
		src: {
			base: "_src/",
			templates: "_src/PageTemplates/",
			sublayouttemplates: "_src/SublayoutTemplates/",
			velocitytemplates: "_src/VelocityTemplates/",
			styles: "_src/StyleSheets/",
			scripts: "_src/Scripts/"
		},
		tmp: {
			base: "_tmp/",
			templates: "_tmp/PageTemplates/",
			sublayouttemplates: "_tmp/SublayoutTemplates/",
			velocitytemplates: "_tmp/VelocityTemplates/",
			styles: "_tmp/Styles/",
			scripts: "_tmp/js/"
		},
		dist: {
			base: "_dist/",
			templates: "_dist/PageTemplates/",
			sublayouttemplates: "_dist/SublayoutTemplates/",
			velocitytemplates: "_dist/VelocityTemplates/",
			styles: "_dist/Styles/",
			scripts: "_dist/js/"
		},
		bower: 'bower_components/'
	});

	// Configuration values to be passed to generated JavaScript runtime.
	grunt.config('runtime', {
		clinicaltrialsearch : {
			apiserver : {
				name : {
					dev : 'clinicaltrialsapi.cancer.gov',
					prod : 'clinicaltrialsapi.cancer.gov'
				},
				port : {
					dev : '443',
					prod : '443'
				},
				basePath : {
					dev : 'v1',
					prod : 'v1'
				}
			}
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
				"_src": "_src"
			}
		}
	});

	/*****************************************
	 *  SASS Preprocessing
	 ****************************************/
	grunt.loadNpmTasks('grunt-sass');
	grunt.config('sass', {
		dev: {
			options: {
				sourceMap: true
			},
			files: {
				'<%= dirs.tmp.styles %>nvcg.css': '<%= dirs.src.styles %>nvcg.scss'
			}
		},
		prod: {
			options: {
				sourceMap: false,
				outputStyle: 'compressed'
			},
			files: {
				'<%= dirs.tmp.styles %>nvcg.css': '<%= dirs.src.styles %>nvcg.scss'
			}
		}
	});

	/*****************************************
	 *  Build template files
	 ****************************************/
	grunt.loadNpmTasks('grunt-bake');
	grunt.config('bake', {
		templates: {
			options: {},
			files: [{
				expand: true,
				cwd: '<%= dirs.src.templates %>',
				src: ['**/*.aspx'],
				dest: '<%= dirs.tmp.templates %>',
				ext: ".aspx"
			}]
		},
		sublayouttemplates: {
			options: {},
			files: [{
				expand: true,
				cwd: '<%= dirs.src.sublayouttemplates %>',
				src: ['**/*.ascx'],
				dest: '<%= dirs.tmp.sublayouttemplates %>',
				ext: ".ascx"
			}]
		},
		velocitytemplates: {
			options: {},
			files: [{
				expand: true,
				cwd: '<%= dirs.src.velocitytemplates %>',
				src: ['**/*.vm'],
				dest: '<%= dirs.tmp.velocitytemplates %>',
				ext: ".vm"
			}]
		}
	});
	
	
  /***************************************
   * Modernizr Builder
   * Builds a custom version of modernizr with our options.
   ***************************************/
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.config('modernizr', {
    dist: {
      "crawl": false,
      "parseFiles": false,
      "customTests": [],
      "dest": '<%= dirs.tmp.scripts%>modernizr.js',
      "tests": [
        "audio",
        "canvas",
        "canvastext",
        "cookies",
        "eventlistener",
        "geolocation",
        "hashchange",
        "input",
        "inputtypes",
        "json",
        "postmessage",
        "svg",
        "touchevents",
        "video",
        "webgl",
        "websockets",
        "cssanimations",
        "bgpositionxy",
        "backgroundsize",
        "bgsizecover",
        "borderimage",
        "borderradius",
        "boxshadow",
        "boxsizing",
        "csscalc",
        "checked",
        "csscolumns",
        "cssexunit",
        "flexbox",
        "flexboxlegacy",
        "flexboxtweener",
        "fontface",
        "generatedcontent",
        "cssgradients",
        "hsla",
        "lastchild",
        "multiplebgs",
        "nthchild",
        "opacity",
        "cssreflections",
        "cssremunit",
        "rgba",
        "textshadow",
        "csstransforms",
        "csstransforms3d",
        "csstransitions",
        "cssvalid",
        "websqldatabase",
        "svgclippaths",
        "inlinesvg",
        "smil",
        "webworkers"
      ],
      "options": [
        "domPrefixes",
        "prefixes",
        "addTest",
        "atRule",
        "hasEvent",
        "mq",
        "prefixed",
        "prefixedCSS",
        "prefixedCSSValue",
        "testAllProps",
        "testProp",
        "testStyles",
        "html5shiv",
        "setClasses"
      ],
      "uglify": false //We will let requirejs handle that
    }
  }
);

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
			appDir: '<%= dirs.src.scripts %>NCI',
			dir: '<%= dirs.tmp.scripts %>NCI',
			paths: {
				'requirejs': '../../../bower_components/requirejs/require',
				//'modernizr': '../../../<%= dirs.tmp.scripts %>/modernizr',
				'config': 'config',
				'ContentPage': 'UX/Common/ContentPage',
				'CTHPPage': 'UX/PageSpecific/CTHP/CTHPPage',
				'HomePage': 'UX/PageSpecific/Home/HomePage',
				'InnerPage': 'UX/PageSpecific/Inner/InnerPage',
				'LandingPage': 'UX/PageSpecific/Landing/LandingPage',
				'PDQPage': 'UX/PageSpecific/PDQ/PDQPage',
				'TopicPage': 'UX/PageSpecific/Topic/TopicPage',
				'Popups': 'UX/PageSpecific/Popups/Popups',
				'BasicCTSResultsPage': 'UX/AppModuleSpecific/BasicCTS/Results/BasicCTSResultsPage',
				'BasicCTSSearchPage': 'UX/AppModuleSpecific/BasicCTS/Search/BasicCTSSearchPage',
				'BasicCTSViewPage': 'UX/AppModuleSpecific/BasicCTS/View/BasicCTSViewPage'
			},
			mainConfigFile: '<%= dirs.src.scripts %>NCI/config.js',
			modules: [
				{
					name: 'ContentPage',
					insertRequire: ['ContentPage']
				},
				{
					name: 'CTHPPage',
					insertRequire: ['CTHPPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'HomePage',
					insertRequire: ['HomePage'],
					exclude: ['ContentPage']
				},
				{
					name: 'InnerPage',
					insertRequire: ['InnerPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'LandingPage',
					insertRequire: ['LandingPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'PDQPage',
					insertRequire: ['PDQPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'TopicPage',
					insertRequire: ['TopicPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'Popups',
					insertRequire: ['Popups'],
					exclude: []
				},
				{
					name: 'BasicCTSResultsPage',
					insertRequire: ['BasicCTSResultsPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'BasicCTSSearchPage',
					insertRequire: ['BasicCTSSearchPage'],
					exclude: ['ContentPage']
				},
				{
					name: 'BasicCTSViewPage',
					insertRequire: ['BasicCTSViewPage'],
					exclude: ['ContentPage']
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

	/*****************************************
	 * Uglify JS
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-uglify');
	var oldFiles = {
		expand: true,
		flatten: true,
		dest: '<%= dirs.tmp.scripts %>NCI_OLD',
		src: ['<%= dirs.src.scripts %>NCI_OLD/*.js']
	};
	var commonFile = {
		'<%= dirs.tmp.scripts %>Common.js': [
			'<%= dirs.src.scripts %>NCI/Vendor/respond.js',
			// '<%= dirs.src.scripts %>NCI/Vendor/modernizr.custom.2.7.1.js',
			'<%= dirs.tmp.scripts %>/modernizr.js',
			'<%= dirs.bower %>jquery/jquery.js',
			'<%= dirs.bower %>jquery-ui/jquery-ui.js',
			'<%= dirs.bower %>requirejs/require.js',
			'<%= dirs.src.scripts %>NCI/config.js'
		]
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
			files: [oldFiles, commonFile]
		},
		prod: {
			options: {
				mangle: true
			},
			files: [oldFiles, commonFile]
		}
	});

	/*****************************************
	 *  Cleaning
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.config('clean', {
		tmp: {
			src: ['<%= dirs.tmp.base %>']
		},
		requirejs: {
			// previously used to clean up the require build, but I couldn't get this working using a configure-once setup (see copy:scripts)
			src: []
		}
	});

	/*****************************************
	 *  Copying
	 ****************************************/
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.config('copy', {
		templates: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: ['<%= dirs.tmp.templates %>**/*.aspx'],
				dest: '<%= dirs.dist.templates %>',
				filter: 'isFile'
			}]
		},
		sublayouttemplates: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: ['<%= dirs.tmp.sublayouttemplates %>**/*.ascx'],
				dest: '<%= dirs.dist.sublayouttemplates %>',
				filter: 'isFile'
			}]
		},
		velocitytemplates: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: ['<%= dirs.tmp.velocitytemplates %>**/*.vm'],
				dest: '<%= dirs.dist.velocitytemplates %>',
				filter: 'isFile'
			}]
		},
		styles: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: [
					'<%= dirs.tmp.styles %>**/*.css',
					'<%= dirs.tmp.styles %>**/*.css.map'
				],
				dest: '<%= dirs.dist.styles %>',
				filter: 'isFile'
			}]
		},
		scripts: {
			nonull: true,
			files: [{
				expand: true,
				flatten: true,
				src: [
					'<%= dirs.tmp.scripts %>Common.js*',
					'<%= dirs.tmp.scripts %>NCI_OLD/**/*.js*',
					'<%= dirs.tmp.scripts %>/**/build.txt'
				].concat(grunt.config('requirejs').options.modules.map(function(module) {
					return grunt.template.process('<%= dirs.tmp.scripts %>**/' + grunt.config('requirejs').options.paths[module.name] + '.js*');
				})),
				dest: '<%= dirs.dist.scripts %>',
				filter: 'isFile'
			}]
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
			tasks: ['build-styles:' + 'dev']
		},
		js: {
			files: [
				'<%= dirs.src.scripts %>**/*.js',
				'<%= dirs.src.scripts %>**/*.hbs',
			],
			tasks: ['build-scripts:' + 'dev']
		},
		templates: {
			files: [
				'<%= dirs.src.templates %>*.aspx',
				'<%= dirs.src.templates %>Includes/*.inc',
				'<%= dirs.src.sublayouttemplates %>*.ascx',
				'<%= dirs.src.sublayouttemplates %>Includes/*.inc',
				'<%= dirs.src.velocitytemplates %>*.vm',
				'<%= dirs.src.velocitytemplates %>Includes/*.inc',
				'<%= dirs.src.velocitytemplates %>/*.inc'
			],
			tasks: ['build-templates:' + 'dev']
		}
	});


	// Tasks

	/**
	 * Generates the configuration.js file which is embedded into a front-end build to provide
	 * different values according to which tier the build is targetting.
	 */
	grunt.registerTask('generate-config', 'Generate tier-specific configuration files', function(env) {
		var configPath = grunt.template.process('<%= dirs.src.scripts %>/NCI/Generated/configuration.js');
		// Skeleton for the configuration object.
		var config = {
			'clinicaltrialsearch' : {
				'apiServer' : 'server-name-goes-here',
				'apiPort' : 'port-goes-here',
				'apiBasePath' : 'basePath-goes-here'
			}
		};
		config['clinicaltrialsearch']['apiServer']	= grunt.template.process('<%= runtime.clinicaltrialsearch.apiserver.name.' + (env === 'prod' ? 'prod' : 'dev')  + ' %>'); 
		config['clinicaltrialsearch']['apiPort']	= grunt.template.process('<%= runtime.clinicaltrialsearch.apiserver.port.' + (env === 'prod' ? 'prod' : 'dev')  + ' %>'); 
		config['clinicaltrialsearch']['apiBasePath'] = grunt.template.process('<%= runtime.clinicaltrialsearch.apiserver.basePath.' + (env === 'prod' ? 'prod' : 'dev')  + ' %>'); 
		grunt.file.write(configPath, "define(" + JSON.stringify(config) + ");");
	});

	grunt.registerTask('build-scripts', 'Build the JavaScript.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['generate-config:' + env , 'modernizr:dist', 'requirejs:' + env, 'clean:requirejs', 'uglify:' + env, 'copy:scripts', 'clean:tmp'];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build-styles', 'Build the CSS.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['sass:' + env, 'copy:styles', 'clean:tmp'];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build-templates', 'Build the CDE page, sublayout & velocity templates.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['bake:templates', 'copy:templates', 'bake:sublayouttemplates', 'copy:sublayouttemplates', 'bake:velocitytemplates', 'copy:velocitytemplates', 'clean:tmp'];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build', 'Build all files.', function(env) {
		env = (env === 'prod' ? 'prod' : 'dev');
		grunt.config('env', env);

		var tasks = ['build-styles:' + env, 'build-scripts:' + env, 'build-templates:' + env];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build-local', 'Build all files for local CDE and watch for changes.', function(path) {

		//Assumes path is a PublishedContent folder.
		if (path == null || path == '') {
				grunt.log.error('path for build-local cannot be null or empty');
				return false;
		}

		//HACK: Figure out how to override the dist.
		grunt.config('dirs', {
			src: {
				base: "_src/",
				templates: "_src/PageTemplates/",
				sublayouttemplates: "_src/SublayoutTemplates/",
				velocitytemplates: "_src/VelocityTemplates/",
				styles: "_src/StyleSheets/",
				scripts: "_src/Scripts/"
			},
			tmp: {
				base: "_tmp/",
				templates: "_tmp/Templates/",
				sublayouttemplates: "_tmp/SublayoutTemplates/",
				velocitytemplates: "_tmp/VelocityTemplates/",
				styles: "_tmp/Styles/",
				scripts: "_tmp/js/"
			},
			dist: {
				base: path + "/",
				templates: path + "/PageTemplates/",
				sublayouttemplates: path + "/SublayoutTemplates/",
				velocitytemplates: path + "/VelocityTemplates/",
				styles: path + "/Styles/",
				scripts: path + "/js/"
			},
			bower: 'bower_components/'
		});

		//Watch cannot work yet because it would need to push in the new paths.
		//removing it for now so we don't have to hit CTRL-C everytime we do
		//a build
		var tasks = ['build:dev'];
		grunt.task.run(tasks);
	});

	grunt.registerTask('build-watch', 'Build all files and watch for changes.', function(env) {
		var proxy;

		switch (env) {
			case 'dev/red':
			case 'red-dev':
			case 'red':
				proxy = 'www-red-dev';
				break;
			case 'dev/pink':
			case 'pink-dev':
			case 'pink':
				proxy = 'www-pink-dev';
				break;
			case 'dev/blue':
			case 'blue-dev':
			case 'blue':
			case 'dev':
			default:
				proxy = 'www-blue-dev';
				if(/^\d+$/.test(env))
					proxy = 'www-ocdev' + env + '.ha2';
				break;
			case 'qa':
				proxy = 'www-qa';
				break;
			case 'dt-qa':
			case 'dt':
				proxy = 'www-dt-qa';
				break;
			case 'stage':
				proxy = 'www-stage';
				break;
			case 'training':
				proxy = 'www-training';
				break;
			case 'preview':
				proxy = 'preview';
				break;
			case 'production':
			case 'prod':
				proxy = 'www';
				env = 'prod';
				break;
		}
		env = (env === 'prod' ? 'prod' : 'dev');

		grunt.config('env', env);
		grunt.config.merge({
			develop: {
				server: {
					env: {
						PROXY_ENV: proxy
					}
				}
			}
		});

		var tasks = ['build:' + env, 'develop', 'watch'];
		grunt.task.run(tasks);
	});

	// We should ALWAYS define the 'default' task
	grunt.registerTask('default', ['build']);

	// Deploy task is used by the build script
	grunt.registerTask('deploy', ['build:prod']);
};
