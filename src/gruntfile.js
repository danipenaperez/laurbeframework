module.exports = function (grunt) {
    grunt.initConfig({

    concat: {
            js: {
                src: [
                        'javascript/core/*.js',
                        'javascript/components/*.js',
                        'javascript/components/app/*.js', 
                        'javascript/components/composite/*.js',
                        'javascript/components/login/*.js' 
                    ],
                dest: 'js/combined.js'
            }
    } 
    // define source files and their destinations
    // ,uglify: {
    //     files: { 
    //         src: 'dist/combined.js',  // source files mask
    //         dest: 'dist/',    // destination folder
    //         expand: true,    // allow dynamic building
    //         flatten: true,   // remove all unnecessary nesting
    //         ext: '.min.js'   // replace .js to .min.js
    //     }
    // },
    // watch: {
    //     js:  { files: 'public/laurbe/js/**/*.js', tasks: [ 'uglify' ] },
    // }
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-concat');
// grunt.loadNpmTasks('grunt-contrib-watch');
// grunt.loadNpmTasks('grunt-contrib-uglify');

// register at least this one task
grunt.registerTask('default', ['concat' ]);



};

// https://hub.docker.com/r/andreptb/grunt  

// docker pull andreptb/grunt
//docker run -it --rm --name concat -v $PWD:/js andreptb/grunt