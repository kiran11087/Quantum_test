module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            dev: {
                options: {
                    port: 8040,
                    hostname: 'localhost',
                    debug: true,
                    keepalive: false,

                    base: {
                        path: "../Quantum_test",
                        options: {
                            index: "/src/html/index.html"
                        }
                    },
                    open: true
                }
            }
    },
    watch: {
            options: {
                livereload: true
            },
            stylesheets: {
                files: ['src/css/*.css']
            },
            scripts: {
                files: ['src/**/*.js', 'lib/*.js']
            },

            html: {
                files: 'src/html/*.html'
            }
        }
});
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default taskx
    grunt.registerTask('default', ['connect:dev', 'watch']);

};