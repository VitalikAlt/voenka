/**
 * Created by Виталий on 25.09.2016.
 */
//Получить нормативы студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)

module.exports.getStandarts = function(standarts, standarts_st) {
    
    var getStandarts = function (aData, callback, error) {
        standarts_st.get({student_id: aData.student_id}, function (data) {

            var rows = [];
            var count = 0;

            data.forEach(function (standart) {
                standarts.get({standart_id: standart.standart_id}, function (name) {
                    
                    var status = false;
                    
                    rows.forEach(function (row) {
                        if (row.nameStandart === name) {
                            status = true;
                            row['semestr' + standart.term] = standart.standart;
                        }
                    });
                    
                    if (status === false) {
                        rows.push({ nameStandart: name});
                        rows[rows.length - 1]['semestr' + standart.term] = standart.standart;
                    }
                    
                    count++;
                    
                    (data.length === count)? callback(rows): null;
                    
                }, error);
            })
            
        }, error);
    };

    return getStandarts;
};