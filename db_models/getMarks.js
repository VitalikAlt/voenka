/**
 * Created by Виталий on 25.09.2016.
 */
//Получить оценки студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)

module.exports.getMarks = function(discipline, marks) {

    var getMarks = function (aData, callback, error) {
        marks.get({student_id: aData.student_id}, function (data) {

            var rows = [];
            var count = 0, average = 0;

            data.forEach(function (mark) {
                discipline.get({discipline_id: mark.discipline_id}, function (name) {

                    var status = false;

                    rows.forEach(function (row) {
                        if (row.nameSubject === name) {
                            status = true;
                            row['semestr' + mark.term] = mark.mark;
                            average += Number(mark.mark);
                        }
                    });

                    if (status === false) {
                        rows.push({ nameSubject: name});
                        rows[rows.length - 1]['semestr' + mark.term] = mark.mark;
                        average += Number(mark.mark);
                    }

                    count++;

                    (data.length === count)? callback(rows, average/count): null;

                }, error);
            })
        }, error);
    };

    return getMarks;
};