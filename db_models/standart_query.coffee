module.exports.standarts = (aDatabase) ->

  query = {}

  query.list = (callback, error) ->
    aDatabase.find((err, array) =>
      return if !err then callback(array) else error(err)
    )

  query.remove = (anID, callback, error) ->
    aDatabase.remove({_id: anID}, (err, success) =>\
      return if !err then callback(success) else error(err))

  query.remove_All = (callback, error) ->
    aDatabase.remove((err, success) =>
      if !err then callback(err) else error(err))

  return query