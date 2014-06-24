/**
 * AngularJS view interface
 */
NG.VIEW = CLASS({

	init : function(inner, self) {'use strict';

		var
		// apply.
		apply,

		// go.
		go,
		
		// go force.
		goForce,

		// close.
		close;

		self.apply = apply = function(func) {

			var
			// $scope
			$scope = self.$scope,

			// f
			f = function() {

				if ($scope !== undefined) {

					EACH(self, function(value, name) {
						delete $scope[name];
					});
				}

				func();

				if ($scope !== undefined) {

					EACH(self, function(value, name) {
						$scope[name] = value;
					});
				}
			};

			($scope === undefined || ($scope !== TO_DELETE && $scope.$$phase !== TO_DELETE) || ($scope.$root !== undefined && $scope.$root !== TO_DELETE && $scope.$root.$$phase !== TO_DELETE)) ? f() : $scope.$apply(f);
		};

		self.go = go = function(path) {
			apply(function() {
				self.$location.path(path);
			});
		};

		self.goForce = goForce = function(path) {
			apply(function() {
				if (self.$location.path() === path) {
					location.reload();
				} else {
					self.$location.path(path);
				}
			});
		};

		self.close = close = function() {
			// to implement
		};

	}
});
