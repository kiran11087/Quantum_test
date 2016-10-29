var app = angular.module("dropdownApp", []);

app.controller("dropdownController", function($scope) {
	$scope.driversList = [{
		vehicleNumber: "123456",
		driverThumb: "john.jpg",
		vehicleThumb: "vehicle.jpg"
	}, {
		driverName: "Adom",
		vehicleNumber: "343434",
		driverThumb: "john.jpg",
		vehicleThumb: "vehicle.jpg"
	},{
		driverName: "Mery",
		vehicleNumber: "242424",
		driverThumb: "john.jpg",
		vehicleThumb: "vehicle.jpg"
	},{
		driverName: "Charlie",
		vehicleNumber: "757577",
		driverThumb: "john.jpg",
		vehicleThumb: "vehicle.jpg"
	},{
		driverName: "Kiran",
		vehicleNumber: "898989",
		driverThumb: "john.jpg",
		vehicleThumb: "vehicle.jpg"
	},{
		driverName: "Kiran",
		driverThumb: "john.jpg",
		vehicleThumb: "vehicle.jpg"
	}];
});



app.directive("dropdown", function($rootScope) {
	return {
		restrict: "E",
		templateUrl: "../src/html/dropdownTemplate.html",
		scope: {
			list: "=",
			selected: "=",
		},
		link: function(scope) {
			scope.listVisible = false;
			scope.isPlaceholder = true;
			scope.searchText = '';
			scope.display = "Select driver to pair";

			scope.showTooltip = function(item) {
				scope.isPlaceholder = false;
				scope.hoverdItem = item;
			};

			scope.selectItem = function(item){
				scope.selected = item;
				scope.listVisible = false;
			};


			scope.isSelected = function(item) {
				return item[scope.property] === scope.selected[scope.property];
			};

			scope.show = function() {
				scope.listVisible = true;
			};

			scope.$watch("selected", function(value) {
				if(scope.selected){
					scope.textHighlight = true;
					scope.isPlaceholder = scope.selected[scope.property] === undefined;
				scope.display = (scope.selected.driverName? scope.selected.driverName:'-') + '/' + (scope.selected.vehicleNumber?scope.selected.vehicleNumber:'-');
				}
				
			});
		}
	}
});


app.directive('tooltip', function() {
    return {
        restrict: 'A',
        transclude: true,
         controller: function($scope, $element) {
            $scope.isShown = false;
            this.showHover = function(selectedItem) {
            	$scope.selectedItem = selectedItem;
                $scope.isShown = true;
            },

            this.hideHover = function() {
                $scope.isShown = false;
            }
        },
        template: '<div ng-transclude></div>' +
            '<div id="divPopup" ng-show="isShown">' +
            '<div class="floatLeft"> DRIVER' +
           
            '</div>' +
            '<div class="floatLeft margin3">' +
            '<div>' +
            '{{selectedItem.driverName}}' +
            '</div>' +
            '<div>' +
            '{{selectedItem.driverThumb}}' +
            '</div>' +
               '<div class="floatLeft"> VEHICLE' +

            '<div>' +
            '{{selectedItem.vehicleNumber}}' +
            '</div>' +
            '<div>' +
            '{{selectedItem.vehicleThumb}}' +
            '</div>' +
            '</div>' +
            '</div>',
            link: function(scope, element, attr, ctrl) {
    element.bind('mouseover', function() {
        scope.$apply(function() {
            ctrl.showHover(scope.hoverdItem);
        });
    });
    element.bind('mouseleave', function() {
        scope.$apply(function() {
            ctrl.hideHover();
        });
    });
    }
    
}
});