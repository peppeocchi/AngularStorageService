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
      lget: function(key, json) {
        var value = localStorage.getItem(key);
        if(json) {
          value = JSON.parse(value);
        }
        return value;
      },
      sget: function(key, json) {
        var value = sessionStorage.getItem(key);
        if(json) {
          value = JSON.parse(value);
        }
        return value;
      },
      lset: function(key, value, json) {
        if(this.lget(key) && this.debug) {
          console.warn('Key "' + key + '" already exists, replacing with ' + value);
        }
        if(json) {
          value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
      },
      sset: function(key, value, json) {
        if(this.sget(key) && this.debug) {
          console.warn('Key "' + key + '" already exists, replacing with ' + value);
        }
        if(json) {
          value = JSON.stringify(value);
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
