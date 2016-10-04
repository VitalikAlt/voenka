/**
 * Created by Алексей on 27.09.2016.
 */
//Получить оценки студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)

module.exports.getMarks = function(discipline, marks, groups, profile_st, group_dis) {

    var getStudent = function (aData, callback, error) {

        var promise = new Promise(function (onResolved, onReject) {
            discipline.getByTeacherID({teacher_id: aData.teacher_id}, function(data) {
                onResolved(data);
            });
        }, function(err) {});

        promise.then(function (success) {
            var count_dis = 0;
            var rows = [];
            success.forEach(function (subject) {
                group_dis.get({discipline_id: subject._id}, function(group) {
                    groups.getElementById(group.group_id, function (group) {
                        profile_st.getProfileByGroup(group._id, function (profile_arr) {
                            var count_prf = 0;
                            profile_arr.forEach(function(profile) {
                                marks.get1({student_id: profile.student_id, discipline_id: subject._id}, function (results) {
                                    var discipline_marks = {};
                                    discipline_marks.id = subject._id;
                                    results.forEach(function (mark) {
                                        discipline_marks['semestr' + mark.term] = {marks: mark.mark, presence: true};
                                    });
                                    for (var i = 1; i < 9; i++) {
                                        var status = false;
                                        if (discipline_marks['semestr' + i] === undefined) {
                                            status = true;
                                        }
                                        if (status) {
                                            discipline_marks['semestr' + i] = {marks: "", presence: false};
                                        }
                                    }
                                    var status = false;
                                    var name = group.squad + " курс " + group.course + " взвод";
                                    rows.forEach(function (row) {
                                        if (row.name === name) {
                                            status = true;
                                            addDis(row, subject);
                                            addStudent(row, profile, subject.discipline_name, discipline_marks);
                                        }
                                    });
                                    if (!status) {
                                        rows.push({name: name, subjects: [], students: []});
                                        addDis(rows[rows.length - 1], subject);
                                        addStudent(rows[rows.length - 1], profile, subject.discipline_name, discipline_marks);
                                    }
                                    count_prf++;
                                    if (count_prf === profile_arr.length) count_dis++;
                                    if (success.length === count_dis && count_prf === profile_arr.length) {
                                        callback(rows);
                                    }
                                });
                            })
                        });
                    });
                })
            })
        }, function (err) {});

    };

    var addStudent = function (row, profile, discipline, marks) {
        var status = false;
        var name = profile.surname + ' ' + profile.name[0] + '. ' + profile.fatherName[0] + '.';
        row.students.forEach(function (student) {
            if (student.student.name === name) {
                status = true;
                if (!student[discipline]) {
                    student[discipline] = marks;
                }
            }
        });
        if (!status) {
            row.students.push({
                student: {name: name},
                data: profile
            });
            row.students[row.students.length - 1][discipline] = marks;
        }
    };

    var addDis = function (row, discipline) {
        var status = false;
        row.subjects.forEach(function (subject) {
            if (subject.name === discipline.discipline_name) {
                subject
                status = true;
            }
        });
        if (!status) {
            row.subjects.push({
                name: discipline.discipline_name,
                label: discipline.discipline_name,
                titles: [
                    { name: 'Студент', options: { label: 'student', isDiaryDay: false, editable: false } }
                ]
            });
            var num = row.subjects.length - 1;
            for (var i = 1; i < 9; i++) {
                row.subjects[num].titles.push({name: i + 'семестр', options: { label: 'semestr' + i, isDiaryDay: true, editable: true }});
            }
        }
    };

    return getStudent;
};