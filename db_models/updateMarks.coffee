module.exports.updateMarks = (marks) ->

  updateMarks = (aData, callback, error) ->

    success = true

    aData.req.forEach (mark) =>
      try
        marks.updateData(mark, ((res) ->), ((error) -> success = false))
      catch err
        error(err)

    return if success then callback(true) else error(false)