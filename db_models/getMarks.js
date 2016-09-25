/**
 * Created by Виталий on 25.09.2016.
 */
//Получить оценки студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)

module.exports.getMarks = function(discipline, marks) {

    var addMark = function (row, term, mark) {
        switch (term) {
            case '1': { row.semestr1 = mark; break; }
            case '2': { row.semestr2 = mark; break; }
            case '3': { row.semestr3 = mark; break; }
            case '4': { row.semestr4 = mark; break; }
            case '5': { row.semestr5 = mark; break; }
            case '6': { row.semestr6 = mark; break; }
            case '7': { row.semestr7 = mark; break; }
            case '8': { row.semestr8 = mark; break; }
        }
    };

    var getMarks = function (aData, callback, error) {
        marks.get({student_id: aData.student_id}, function (data) {
            var rows = [];
            var count = 0;
            var average = 0;
            var status = false;
            data.forEach(function (mark) {
                discipline.get({discipline_id: mark.discipline_id}, function (name) {
                    status = false;
                    rows.forEach(function (row) {
                        if (row.nameSubject === name) {
                            status = true;
                            addMark(row, mark.term, mark.mark);
                            average += Number(mark.mark);
                        }
                    });
                    if (status === false) {
                        rows.push({ nameSubject: name});
                        addMark(rows[rows.length - 1], mark.term, mark.mark);
                        average += Number(mark.mark);
                    }
                    count++;
                    if (data.length === count) {
                        average = average/count;
                        callback(rows, average);
                    }
                }, error);
            })
        }, error);
    };

    return getMarks;
};