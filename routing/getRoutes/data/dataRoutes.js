/**
 * Created by vitalik on 26.11.16.
 */
module.exports.add = function(core) {
    var handlerFactory = core.handlerFactory;
    var db = core.db;

//   Получить нормативы студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)
    core.routes.push({
        url: '/get/standarts',
        handler: handlerFactory.createWithData(db.getStandarts)
    });

//Получить оценки студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)
    core.routes.push({
        url: '/get/students',
        handler: handlerFactory.createWithData(db.getStudents)
    });

//   Получить оценки студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)
    core.routes.push({
        url: '/get/marks',
        handler: handlerFactory.createWithData(db.getMarks)
    });
//   Получить группу студента
    core.routes.push({
        url: '/get/groups',
        handler: handlerFactory.createWithData(db.groups.getElementById)
    });
};