#Добавить студента (Логин, пароль, взвод, курс)

module.exports.addStudent = (permissions, profile_st, groups) ->

  addStudent = (aData, callback, error) ->

    console.log(aData)

    getPermissions = () -> new Promise(resolve, reject) ->
      permissions.addData({login: aData.login, password: aData.password, permission: 'student'},
        ((permission) ->
          console.log(1)
          return resolve(permission)),
        ((error) -> console.log(2))
      )

    addData = () -> new Promise(resolve, reject) ->
      groups.addData({course: aData.course, squad: aData.squad},
        ((group) -> return resolve(group)),
        (error)
      )

    Promise.all([getPermissions, addData])
      .then((data) ->
        profile_st.addData({student_id: data[0]._id, group_id: data[1]._id},
          ((result) -> return callback(result)),
          (error)
        )
      )