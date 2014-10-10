function DefaultListCtrl($injector, $scope, defaultCrudResource, items, pageSize) {
    var self = this;
    var defaultResource = $injector.get(defaultCrudResource);

    self.items = items;
    self.pageSize = pageSize;
    self.page = 1;
    self.filter = {};

    $scope.$watchCollection(function() { return self.filter }, function() {
        self.reload();
    });

    self.load = function() {
        var params = {page: self.page};

        if (self.sort) {
            angular.extend(params, self.sort);
        }
		if (self.filter) {
			params.filter = self.filter
		}

        defaultResource.list(params).then(function(items) {
            self.items = items;
        });
    };

    self.reload = function() {
        self.page = 1;
        self.load();
    }
}

function DefaultShowCtrl(item) {
    var self = this;
    self.item = item;
};

function DefaultCreateEditCtrl(item) {
    var self = this;
    self.item = item;
}

angular.module('grails.controllers', [])
    .controller('DefaultListCtrl', DefaultListCtrl)
    .controller('DefaultShowCtrl', DefaultShowCtrl)
    .controller('DefaultCreateEditCtrl', DefaultCreateEditCtrl);