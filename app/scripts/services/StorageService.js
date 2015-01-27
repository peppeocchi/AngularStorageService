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

      /*
      | Debug flag, if true prints out debug infor on 
      */
      debug: false,

      /*
      | Check if web storage is supported
      */
      isSupported: function() {
        var go = 'go';
        try {
          this.lset(go, go);
          this.ldel(go);
          this.sset(go, go);
          this.sdel(go);
          return true;
        } catch(e) {
          return false;
        }
      },

      /*
      | Get from local storage
      |
      | @param (string) key - the key to get
      | @param (bool) json - if true will parse the value for the provided key
      |
      | @return string|object|undefined
      */
      lget: function(key, json) {
        var value = localStorage.getItem(key);
        if(json && value) {
          value = JSON.parse(value);
        }
        return value;
      },

      /*
      | Get from session storage
      |
      | @param (string) key - the key to get
      | @param (bool) json - if true will parse the value for the provided key
      |
      | @return string|object|undefined
      */
      sget: function(key, json) {
        var value = sessionStorage.getItem(key);
        if(json && value) {
          value = JSON.parse(value);
        }
        return value;
      },

      /*
      | Set a key/value in local storage
      |
      | @param (string) key - the key to set
      | @param (string) value - the value to set
      | @param (bool) json - if true will convert the value to a string
      */
      lset: function(key, value, json) {
        if(this.lget(key) && this.debug) {
          console.warn('Key "' + key + '" already exists, replacing with ' + value);
        }
        if(json) {
          value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
      },

      /*
      | Set a key/value in session storage
      |
      | @param (string) key - the key to set
      | @param (string) value - the value to set
      | @param (bool) json - if true will convert the value to a string
      */
      sset: function(key, value, json) {
        if(this.sget(key) && this.debug) {
          console.warn('Key "' + key + '" already exists, replacing with ' + value);
        }
        if(json) {
          value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
      },

      /*
      | Check if a key is present in local storage
      |
      | @param (string) key - the key search
      */
      lhas: function(key) {
        return this.lkeys().indexOf(key) !== -1;
      },

      /*
      | Check if a key is present in session storage
      |
      | @param (string) key - the key search
      */
      shas: function(key) {
        return this.skeys().indexOf(key) !== -1;
      },

      /*
      | Remove a key from local storage
      |
      | @param (string) key - the key to set
      | @param (bool) check - if true it doesn't remove the key if already exists (and return false)
      |
      | @return bool
      */
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

      /*
      | Remove a key from session storage
      |
      | @param (string) key - the key to set
      | @param (bool) check - if true it doesn't remove the key if already exists (and return false)
      |
      | @return bool
      */
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
      },

      /*
      | Get the registered keys in local storage
      |
      | @return array
      */
      lkeys: function() {
        var keys = [];
        for(v in localStorage) {
          keys.push(v);
        }

        return keys;
      },

      /*
      | Get the registered keys in session storage
      |
      | @return array
      */
      skeys: function() {
        var keys = [];
        for(v in sessionStorage) {
          keys.push(v);
        }

        return keys;
      },

      /*
      | Removes all the registered keys from local storage
      */
      lempty: function() {
        var keys = this.lkeys;
        for(v in localStorage) {
          this.ldel(v);
        }
      },

      /*
      | Removes all the registered keys from session storage
      */
      sempty: function() {
        var keys = this.lkeys;
        for(v in sessionStorage) {
          this.ldel(v);
        }
      },

      /*
      | Removes all the registered keys from both local & session storage
      */
      empty: function() {
        this.lempty();
        this.sempty();
      }
    };
  }]);
