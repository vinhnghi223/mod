describe('Controller', function() {

  var scope={},venueItem,validSearchWord="sushi",searchService;
  var venueItem={name:'sushi',location:"1,1",distance:"0",address:"Finland",someOtherProp:"something"};
  var $timeout;

  beforeEach(function () {
    module('nearByLocationApp');
    inject(function($rootScope,$controller,$q,_$timeout_){
      $timeout = _$timeout_;
      searchService={
        search: function () {
          return $q.resolve([venueItem]) //same as when
        }
      };
      spyOn(searchService,"search").and.callThrough();
      $controller('listViewCtrl',{
        $scope: scope,
        searchService:searchService
      });
    });
  });
  describe('listViewCtrl', function () {
    it('The venueList should be empty by default', function () {
      expect(scope.venueList.length).toBe(0);
    });

    it('The loading should be true then changes to false after searching', function () {
      scope.search(validSearchWord);
      expect(scope.loading).toBeTruthy();
      $timeout.flush();
      $timeout.verifyNoPendingTasks();
      expect(scope.loading).toBeFalsy;
    });
  });

  describe('listViewCtrl.search', function () {
    beforeEach(function () {
      scope.search(validSearchWord);
      $timeout.flush();
      $timeout.verifyNoPendingTasks();
    })

    it('should call searchService.search with the right parameter',function() {
      expect(searchService.search).toHaveBeenCalledWith(validSearchWord);
    })

    it('should populate the list after searching', function() {
      expect(scope.venueList).toEqual([venueItem])
      expect(scope.venueList.length).toBeGreaterThan(0);
    })

    it('should execute and return venue item in the right format', function() {
      var venue = scope.venueList[0]
      for(key in venue){ //No need for this
        if(venue.hasOwnProperty(key)){
          expect(key).toBeDefined();
        }
      }
    });

  });

});

