'use strict';

/**
 * @ngdoc service
 * @name App.StorageService
 * @description
 * # StorageService
 * # Wrapper for HTML5 local & session storage
 */
angular.module('App')
  .service('StorageService', [function StorageService() {
    return {
      debug: false,
      lget: function(key) {
        return localStorage.getItem(key);
      },
      sget: function(key) {
        return sessionStorage.getItem(key);
      },
      lset: function(key, value) {
        if(this.get(key) && this.debug) {
          console.warn('Key "' + key + '" already exists, replacing with ' + value);
        }
        localStorage.setItem(key, value);
      },
      sset: function(key, value) {
        if(this.get(key) && this.debug) {
          console.warn('Key "' + key + '" already exists, replacing with ' + value);
        }
        sessionStorage.setItem(key, value);
      },
      ldel: function(key, check) {
        if(check) {
          if(!this.lget(key)) {
            if(this.debug) {
              console.warn('Key ' + key + ' doesn\'t exists');
            }
            return false;
          }
        }
        localStorage.removeItem(key);
        return true;
      },
      sdel: function(key, check) {
        if(check) {
          if(!this.sget(key)) {
            if(this.debug) {
              console.warn('Key ' + key + ' doesn\'t exists');
            }
            return false;
          }
        }
        sessionStorage.removeItem(key);
        return true;
      }
    };
  }]);
