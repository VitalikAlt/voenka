/**
 * Created by Виталий on 25.09.2016.
 */
//Получить нормативы студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)

module.exports.getStandarts = function(standarts, standarts_st) {

    var addStandart = function (row, term, result) {
        switch (term) {
            case '1': { row.semestr1 = result; break; }
            case '2': { row.semestr2 = result; break; }
            case '3': { row.semestr3 = result; break; }
            case '4': { row.semestr4 = result; break; }
            case '5': { row.semestr5 = result; break; }
            case '6': { row.semestr6 = result; break; }
            case '7': { row.semestr7 = result; break; }
            case '8': { row.semestr8 = result; break; }
        }
    };

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
                            addStandart(row, standart.term, standart.standart);
                        }
                    })
                    if (status === false) {
                        rows.push({ nameStandart: name});
                        addStandart(rows[rows.length - 1], standart.term, standart.standart);
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