//S1:
module.exports = function (grunt) {
    'use strict';
 
    //S2    
    grunt.initConfig({
        //S3:Open the package.json
        pkg: grunt.file.readJSON('package.json'),
        //S4:The Concate Task
        concat: {
            dist: {
                options: {
                    separator: '\n\r',
                    banner: '/*\nConcatenated JS file \n' +
                            'Author: Geysir It \n' +
                            'Created Date: <%= grunt.template.today("yyyy-mm-dd") %>' +
                            '\n */ \n'
                },
                // select the files to concatenate
                src: ['Scripts/_calc.js', 'Scripts/_data.js', 'Scripts/_format.js', 'Scripts/_main.js', 'Scripts/_main.js', 'Scripts/_persona.js', 'Scripts/references.js', 'Scripts/_utils.js'],
                // the resulting JS file
                dest: 'Scripts/main.js'            }
        },
 
        //S5:Task for Minification
        uglify: {
            options: {
                //  banner for inserting at the top of the result
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                src: ['Scripts/main.js'],
                dest: 'Scripts/main.min.js'
            }
        },

        watch: {
            files: ['Scripts/*.js', "!Scripts/main.js", "!Scripts/main.min.js"],
            tasks: ['concat', 'uglify']
        }
});
 
//S6: The Required Plug-Ins whihc will be loaded for Task
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.loadNpmTasks('grunt-contrib-concat');
 
grunt.loadNpmTasks('grunt-contrib-uglify');


 
//S7: the array of tasks
grunt.registerTask('default', ['concat', 'uglify']);
};