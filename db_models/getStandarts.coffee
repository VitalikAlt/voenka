#   Получить нормативы студента в виде массива строк: наименование, семестр - оценка, семестр - оценка, ...)

module.exports.getStandarts = (standarts, standarts_st) ->
  getStandarts = (aData, callback, error) ->
    standarts_st.get({student_id: aData.student_id}, (data) ->
      rows = []
      count = 0

      data.forEach (standart) ->
        standart.get({standart_id: standart.standart_id}, (name) ->

          status = false

          rows.forEach (row) ->
            if row.nameStandart == name
              status = true;
              row['semestr' + standart.term] = standart.standart;

          if !status
            rows.push({ nameStandart: name});
            rows[rows.length - 1]['semestr' + standart.term] = standart.standart;

          ++count

          callback(rows) if (data.length == count)
        ,
          error
        )
    ,
      error
    )