/**
 * AngularJS view interface
 */
NG.VIEW = CLASS({

	init : function(cls, inner, self) {'use strict';

		var
		// apply.
		apply,

		// close.
		close;

		self.apply = apply = function(func) {

			var
			// $scope
			$scope = self.$scope,

			// f
			f = function() {

				EACH(self, function(value, name) {
					delete $scope[name];
				});

				func();

				EACH(self, function(value, name) {
					$scope[name] = value;
				});
			};

			if ($scope !== undefined) {
				($scope.$$phase || $scope.$root.$$phase) ? f() : $scope.$apply(f);
			}
		};

		self.close = close = function() {
			// to implement
		};

	}
});
