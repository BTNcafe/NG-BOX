NG.INIT = METHOD({

	run : function(m, box, callback) {'use strict';

		angular.module(box.boxName, ['ngRoute']).config(function($routeProvider) {

			callback(function(target) {

				target.controller = function($scope) {

					var
					// view
					view = target();

					view.$scope = $scope;

					EACH(view, function(value, name) {
						$scope[name] = value;
					});
				};

			}, function(params) {

				var
				// uris
				uris = params.uris,

				// target
				target = params.target,

				// page
				page = params.page,

				// f.
				f;

				EACH(uris, f = function(uri) {

					$routeProvider.when('/' + uri, {
						controller : function($scope, $routeParams) {

							var
							// view
							view;

							if (target !== undefined) {

								view = target($routeParams);

								view.$scope = $scope;

								EACH(view, function(value, name) {
									$scope[name] = value;
								});

								$scope.$on('$routeChangeStart', function() {
									view.close();
								});
							}
						},
						templateUrl : page,
						template : page === undefined ? '&nbsp;' : undefined
					});
				});
			});

			$routeProvider.otherwise({
				redirectTo : '/'
			});
		});
	}
});
