// Generated by CoffeeScript 1.11.1
(function() {
  module.exports.standarts = function(aDatabase) {
    var query;
    query = {};
    query.list = function(callback, error) {
      return aDatabase.find((function(_this) {
        return function(err, array) {
          if (!err) {
            return callback(array);
          } else {
            return error(err);
          }
        };
      })(this));
    };
    query.remove = function(anID, callback, error) {
      return aDatabase.remove({
        _id: anID
      }, (function(_this) {
        return function(err, success) {
          if (!err) {
            return callback(success);
          } else {
            return error(err);
          }
        };
      })(this));
    };
    query.remove_All = function(callback, error) {
      return aDatabase.remove((function(_this) {
        return function(err, success) {
          if (!err) {
            return callback(err);
          } else {
            return error(err);
          }
        };
      })(this));
    };
    return query;
  };

}).call(this);

//# sourceMappingURL=standart_query.js.map
