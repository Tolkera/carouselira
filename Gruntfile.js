module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        copy: {
            main: {
                options: {
                    noProcess: ['*/*/*.{png,gif,jpg,ico}', '*/*.{png,gif,jpg,ico}']
                },
                files: [
                    {src: ['index.html'], dest: 'build/'},
                    {src: ['demo-style.css'], dest: 'build/'},
                    {src: ['demo-script.js'], dest: 'build/'},
                    {src: ['jquery.carouselira.min.js'], dest: 'build/'},
                    {src: ['img/*','img/*/*' ], dest: 'build/'},
                ]
            }
        },

        clean: {
            build: {
                src: [ 'build' ]
            }
        },


        watch: {

            scripts: {
                files: ['jquery.carouselira.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            }
        },

        uglify: {
            build: {
                src: 'jquery.carouselira.js',
                dest: 'jquery.carouselira.min.js'
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['clean', 'copy']);

};