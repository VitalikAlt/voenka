/**
 * Created by Виталий on 25.09.2016.
 */
//Получить оценки студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)

module.exports.getStandarts = function(standarts, standarts_st) {
    var getStandarts = function (aData, callback, error) {
        standarts_st.get({student_id: aData.student_id}, function (data) {
            var rows = [];
            var count = 0;
            var status = false;
            data.forEach(function (standart) {
                standarts.get({standart_id: standart.standart_id}, function (name) {
                    status = false;
                    rows.forEach(function (row) {
                        if (row.nameStandart === name) {
                            status = true;
                            row.results[standart.term - 1] = standart.standart;
                        }
                    })
                    if (status === false) {
                        var results = [];
                        results[standart.term - 1] = standart.standart;
                        rows.push({ nameStandart: name , results: results});
                    }
                    count++;
                    if (data.length === count) {
                        callback(rows);
                    }
                }, error);
            })
        }, error);
    };

    return getStandarts;
};