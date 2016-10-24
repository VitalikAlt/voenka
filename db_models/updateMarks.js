/**
 * Created by Виталий on 04.10.2016.
 */
module.exports.updateMarks = function(marks) {
    
    // внимание: удаления поля оценки не происходит

    function updateMarks(aData, callback, error) {
        
        var success = true;
        
        aData.req.forEach(function (mark) {
            marks.updateData(JSON.parse(mark), function(res) {}, function(err) {
                success = false;
            });
        });
        
        (success)? callback(true): error(false);
    }

    return updateMarks;
};