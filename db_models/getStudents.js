/**
 * Created by Алексей on 27.09.2016.
 */
//Получить оценки студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)

module.exports.getMarks = function(discipline, marks, groups, profile_st) {

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
        discipline.getByTeacherID({teacher_id: aData.teacher_id}, function(data) { // получаем список дисциплин препода
            var rows = [];
            var count = 0;
            var status = false;
            var statusSubject = false;
            data.forEach(function (subject) {
                marks.getByDiscipline({discipline_id: subject.discipline_id}, function (mark) { // получаем все оценки по данной дисциплине
                    profile_st.getProfile(subject.student_id, function (profile) { // получаем профиль студента
                        groups.getElementById(profile.group_id, function (group) { // получаем группу студента
                            status = false;
                            statusSubject = false;
                            rows.forEach(function (row) {
                                if (row.name === group.course + group.squad) {
                                    status = true;
                                    row.subjects.forEach(function (lesson) {
                                        if (subject.name === subject.discipline_name) {

                                        }
                                    });
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
                                callback(rows, average);
                            }
                        })
                    });
                }, error);
            })
        })
    };

    return getMarks;
};