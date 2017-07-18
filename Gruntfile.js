module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config :{ web_dist:'Dev/',we_src:'Src/' },
        //清除
        clean: {
            dist: {
                files: [{
                    src: [
                        '<%= config.web_dist %>css/',
                        '<%= config.web_dist %>js/'
                    ]
                }]
            }
        },
        //拷贝静态文件
        copy:{
            main:{
                files: [
                    {
                        expand:true,
                        cwd:"<%= config.we_src %>",
                        src:'html/**',
                        dest:'<%= config.web_dist %>'
                    }
                    ,
                    {
                        expand:true,
                        cwd:"<%= config.we_src %>",
                        src:'images/**',
                        dest:'<%= config.web_dist %>'
                    },
                    {
                        expand:true,
                        cwd:"<%= config.we_src %>",
                        src:'css/images/**',
                        dest:'<%= config.web_dist %>'
                    }
                    ,
                    {
                        expand:true,
                        cwd:"<%= config.we_src %>",
                        src:'lib/**',
                        dest:'<%= config.web_dist %>'
                    }
               ]
            }
        },
        //uglify插件的配置信息(js压缩插件)
        uglify:{
            options:{
                banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target:{
                files:[
                    {
                        expand:true,
                        cwd:'<%= config.we_src %>js/',
                        src:'**/*.js',
                        dest:'<%= config.web_dist %>js/'
                    }
                ]
            }

        },
        //less插件配置
        less: {
            main: {
                expand: true,
                cwd: '<%= config.we_src %>css/less',
                src: ['*.less'],
                dest: '<%= config.we_src %>css/',
                ext: '.css'
            },
            dev: {
                options: {
                    compress: true,
                    yuicompress:false
                }
            }
        },
        cssmin:{
            options:{
                banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                beautify:{
                    ascii_only:true
                }
            },
            my_target:{
                files:[{
                    expand:true,
                    cwd:'<%= config.we_src %>css/',
                    src:'*.css',
                    dest:'<%= config.web_dist %>css/'
                }]
            }
        },
        //添加指纹
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [{
                    src: [
                        //'<%= config.web_dist %>images/**/*.{jpg,jpeg,gif,png}',
                        '<%= config.web_dist %>css/*.css',
                        '<%= config.web_dist %>js/**/*.js'
                    ]
                }]
            }
        },
        //替换静态资源
        usemin:{
            css:{
                files:{
                    src:['<%= config.web_dist %>css/*.css']
                }
            },
            js:['<%= config.web_dist %>js/**/*.js'],
            html:{
                files:[
                    {
                        src:['<%= config.web_dist %>**/*.html']
                    },
                    {
                        src:['<%= config.web_dist %>*.html']
                    }
                ]
            },
            options:{                    //替换静态文件引地址前缀
                filePrefixer:function(url){
                    if(!url){
                        return '';
                    }
                    return url.replace('../..','<%=request.getContextPath()%>');
                },
                patterns: {
                    js: [
                        [/(images\.png)/, 'Replacing reference to image.png']
                    ]
                }
            }
        },

        //watch插件的配置信息(监控js,css文件,如改变自动压缩,语法检查)
        watch: {
            client: {    //用于监听less文件,当改变时自动编译成css文件
                files: ['<%= config.we_src %>css/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['<%= config.we_src %>js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['<%= config.we_src %>css/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false
                }
            }
        }
    });
    //告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //告诉grunt当我们在终端中输入grunt时需要做些什么(注意先后顺序)
    grunt.registerTask('default',['clean','copy','uglify','less','cssmin','rev','usemin','watch']);

}