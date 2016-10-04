module.exports.updateMarks = (marks) ->

  updateMarks = (aData, callback, error) ->

    success = true

    aData.req.forEach (mark) =>
      marks.updateData(JSON.parse(mark), ((res) ->), ((error) -> success = false))

    return if success then callback(true) else error(false)