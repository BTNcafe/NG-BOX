NG.INIT = METHOD({

	run : function(m, box, callback) {'use strict';

		var
		// controller
		controller = function($routeProvider) {

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

				target.controller['$inject'] = ['$scope'];

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

					var
					// controller
					controller = function($scope, $routeParams) {

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
					};
					
					controller['$inject'] = ['$scope', '$routeParams'];

					$routeProvider.when('/' + uri, {
						controller : controller,
						templateUrl : page,
						template : page === undefined ? '&nbsp;' : undefined
					});
				});
			});

			$routeProvider.otherwise({
				redirectTo : '/'
			});
		};

		controller['$inject'] = ['$routeProvider'];

		angular.module(box.boxName, ['ngRoute']).config(controller);
	}
});
