// Generated by CoffeeScript 1.11.1
(function() {
  module.exports.getMarks = function(discipline, marks) {
    var getMarks;
    return getMarks = (function(_this) {
      return function(aData, callback, error) {
        return marks.get({
          student_id: aData.student_id
        }, function(data) {
          var average, count, rows;
          rows = [];
          count = 0;
          average = 0;
          return data.forEach(function(mark) {
            return discipline.get({
              discipline_id: mark.discipline_id
            }, function(name) {
              var status;
              status = false;
              rows.forEach(function(row) {
                if (row.nameSubject === name) {
                  status = true;
                  row['semestr' + mark.term] = mark.mark;
                  return average += Number(mark.mark);
                }
              });
              if (!status) {
                rows.push({
                  nameSubject: name
                });
                rows[rows.length - 1]['semestr' + mark.term] = mark.mark;
                average += Number(mark.mark);
              }
              ++count;
              if (data.length === count) {
                return callback({
                  rows: rows,
                  average: average / count
                });
              } else {
                return null;
              }
            }, error);
          });
        }, error);
      };
    })(this);
  };

}).call(this);

//# sourceMappingURL=getMarks.js.map
