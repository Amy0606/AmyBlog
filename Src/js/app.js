'use strict';
define(["router"], function () {
    var app = angular.module('AmyBlogApp', ['ui.router']);
    var mainModel={
        menuItems:[{
            name:"resume",
            title:"求职简历",
            url:"/resume",
            tplUrl:"Resume/resume.html",
            dependUrls:["../lib/modernizr.min","../lib/appear","../js/animate"]
        }]
    };
    app.controller('mainCtrl', ['$scope','$location',function($scope, $location) {
        document.title="Amy's Blog";
        $scope.mainData=mainModel;
        $scope.isActive = function (route) {
            return route === $location.url().replace("/","");
        }
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider,$stateParams) {
        $urlRouterProvider.otherwise('/resume');
            $.each(mainModel.menuItems,function(i,n){
                var _cfg= {
                    url: n.url
                    ,templateUrl: n.tplUrl
                };
                var _arrLoadJs=new Array();
                if(n.ctrlName){
                    _cfg.controller=n.ctrlName;
                    _arrLoadJs.push(n.ctrlUrl);
                }
                _cfg.resolve={
                    loadCtrl: ["$q", function($q) {
                        var deferred = $q.defer();
                        //异步加载controller
                        if(n.dependUrls){
                            $.merge(_arrLoadJs, n.dependUrls);
                        }
                        require($.unique(_arrLoadJs), function() { deferred.resolve(); });
                        return deferred.promise;
                    }]
                }
                $stateProvider
                    .state(n.name, _cfg);
            });
    }]);
    app.config(function($controllerProvider,$compileProvider,$filterProvider,$provide){
        app.register = {
            //得到$controllerProvider的引用
            controller : $controllerProvider.register,
            //同样的，这里也可以保存directive／filter／service的引用
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            service: $provide.service
        };
    })
    return app;
});