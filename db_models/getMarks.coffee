#   Получить оценки студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)

module.exports.getMarks = (discipline, marks) ->
  getMarks = (aData, callback, error) ->
    marks.get({student_id: aData.student_id}, (data) ->
      rows = []
      count = 0
      average = 0

      data.forEach (mark) ->
        discipline.get({discipline_id: mark.discipline_id}, (name) =>

          status = false

          rows.forEach (row) ->
            if (row.nameSubject == name)
              status = true
              row['senestr' + mark.term] = mark.term
              average += Number(mark.mark)

          if !status
            rows.push({nameSubject: name});
            rows[rows.length - 1]['semestr' + mark.term] = mark.mark;
            average += Number(mark.mark);

          ++count

          if (data.length == count) then callback(rows, average / count) else null
        , error)
    , error)
