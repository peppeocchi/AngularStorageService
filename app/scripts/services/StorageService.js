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

    var getStorage = function(type) {
      if(['localStorage', 'sessionStorage'].indexOf(type) === -1) {
        throw {
          StorageTypeException: 'The storage type can be localStorage or sessionStorage.'
        };
      }

      return window[type];
    };

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
      | Get from web storage
      |
      | @param (string) type - localStorage || sessionStorage
      | @param (string) key - the key to get
      | @param (bool) json - if true will parse the value for the provided key
      |
      | @return string|object|undefined
      */
      get: function(type, key, json) {
        var webStorage = getStorage(type),
            value = webStorage.getItem(key);
        if(value && json) {
          try {
            value = JSON.parse(value);
          } catch(e) {}
        }

        return value;
      },

      /*
      | Set a key/value in web storage
      |
      | @param (string) key - the key to set
      | @param (string) value - the value to set
      | @param (bool) json - if true will convert the value to a string
      */
      set: function(type, key, value, json) {
        var webStorage = getStorage(type);
        if(webStorage.getItem(key) && this.debug) {
          console.warn('Key "' + key + '" already exists, replacing with ' + value);
        }
        if(json) {
          try {
            value = JSON.stringify(value);
          } catch(e) {}
        }
        webStorage.setItem(key, value);
      },

      /*
      | Remove a key from web storage
      |
      | @param (string) key - the key to set
      | @param (bool) check - if true it doesn't remove the key if already exists (and return false)
      |
      | @return bool
      */
      remove: function(type, key, check) {
        var webStorage = getStorage(type);
        if(check) {
          if(!webStorage.getItem(key)) {
            if(this.debug) {
              console.warn('Key ' + key + ' doesn\'t exists');
            }
            return false;
          }
        }
        webStorage.removeItem(key);
        return true;
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
        return this.get('localStorage', key, json);
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
        return this.get('sessionStorage', key, json);
      },

      /*
      | Set a key/value in local storage
      |
      | @param (string) key - the key to set
      | @param (string) value - the value to set
      | @param (bool) json - if true will convert the value to a string
      */
      lset: function(key, value, json) {
        this.set('localStorage', key, value, json);
      },

      /*
      | Set a key/value in session storage
      |
      | @param (string) key - the key to set
      | @param (string) value - the value to set
      | @param (bool) json - if true will convert the value to a string
      */
      sset: function(key, value, json) {
        this.set('sessionStorage', key, value, json);
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
      lremove: function(key, check) {
        return this.remove('localStorage', key, check);
      },

      /*
      | Remove a key from session storage
      |
      | @param (string) key - the key to set
      | @param (bool) check - if true it doesn't remove the key if already exists (and return false)
      |
      | @return bool
      */
      sremove: function(key, check) {
        return this.remove('sessionStorage', key, check);
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
