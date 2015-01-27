# Angular Storage Service

Wrapper for HTML5 local & session storage

#### Config

- Set the angular app 
- Set debug flag

#### How to use

    StorageService.lget('playlist');

    StorageService.sget('authtoken');

#### Real world example

```javascript
app.controller('AppCtrl', ['$scope', 'StorageService', function($scope, StorageService) {
  ...
  $scope.playlist = [
    {
      author: 'Cool',
      song: 'Song'
    },
    {
      author: 'Very',
      song: 'Cool'
    }
  ];

  if(StorageService.isSupported()) {
    StorageService.lset('playlist', $scope.playlist, true);
  }
  ...
  ...
  if(StorageService.isSupported()) {
    $scope.savedPlaylist = StorageService.lget('playlist', true);
  }
  ...
  ...
  $scope.login = function() {
    var sessionID = ...
    ...
    StorageService.sset('sessionID', sessionID)
  };

  $scope.check = function() {
    var sessionID = StorageService.sget('sessionID');
    ...
    var valid = ....
    ...
    if(!valid) {
      StorageService.sdel('sessionID')
    }
  };

  $scope.getPlaylistIfSessionIDorRemoveIt = function() {
    if(StorageService.shas('sessionID')) {
      $scope.playlist = StorageService.lget('playlist', true);
    } else {
      StorageService.ldel('playlist');
    }
  };

  $scope.clean = function() {
    StorageService.empty();
  }
}]);
```

### License

[MIT license](http://opensource.org/licenses/MIT)
