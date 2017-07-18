/**
 * Created by Amy
 */
'use strict';

(function(){
    var config = {
        baseUrl:""
        ,paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
            'jquery':'../lib/jquery.min'
            ,'bootstrap':'../lib/bootstrap/js/bootstrap.min'
            ,'angular':'../lib/angular/angular.min'
            ,'router':'../lib/angular-ui-router/release/angular-ui-router.min'
            ,'app': '../js/app'
        }
        ,shim: {                     //引入没有使用requirejs模块写法的类库。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
            'bootstrap': {
                deps:['jquery']
            }
            ,'angular': {
                deps:['bootstrap']
            }
            , 'router': {
                deps:['angular']
            }
        }
    };
    require.config(config);
    requirejs(['app'],function(){
        angular.bootstrap(document.body, ['AmyBlogApp'])//这里会去执行app.js这个文件,在app.js里面定义了名为“AmyBlogApp”的模块
    });
}());
