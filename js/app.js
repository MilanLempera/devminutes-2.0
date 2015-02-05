var devminutesApp = angular.module('devminutes', [
  'ngRoute',
  'dmAnimations',
  'dmControllers',
  'angularUtils.directives.dirDisqus'
]);

devminutesApp.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    // $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);   

    $routeProvider.
      when('/', {
        templateUrl: 'partials/episode-list.html',
        controller: 'EpisodeListCtrl',
          resolve: {
            master: function(masterLoader) {
              return masterLoader.load();
            }
          }
      }).
      when('/episode/:episodeId', {
        templateUrl: 'partials/episode-detail.html',
        controller: 'EpisodeDetailCtrl',
          resolve: {
            master: function(masterLoader) {
              return masterLoader.load();
            }
          }
      })
        .otherwise({
          redirectTo: '/'
        });
}]);

devminutesApp.service('masterLoader', function($http, $q) {
  this.master = null;

  this.load = function() {
    if (this.master) {
      return $q.when(this.master);
    }

    return $http.get('../common/episode-grammer.pegjs').then(function(response) {
      this.master = new DMMaster(response.data);
      return this.master;
    }.bind(this))
  }
});

devminutesApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = "DevMinutes";
    });
}]);