$('.modal-user-remove').click(function() {
    let userId = $(this).attr('data-user')
    $('#action-user-remove').attr('data-user', userId)
})
$('#action-user-remove').click(function() {
    const id = Number($(this).attr('data-user'))
    const admin = $('#admin-username').attr('data-admin')
    $.ajax({
        type: 'delete',
        url: `${admin}/remove_user`,
        data: {
            id
        },
        success: function(res, status, xhr) {
            if (res.success) {
                console.log(res.message)
                setTimeout(function() {
                    window.location.href = `${admin}`
                }, 500)
            } else {
                console.log(res.message)
            }
        },
        error: function(xhr, status, error) {
            console.log(error)
        }
    })
})

$('.modal-user-edit').click(function() {
    let user = JSON.parse($(this).attr('data-user'))
    $('#modal-user-edit-username').val(user.username)
    $('#modal-user-edit-email').val(user.email)
    $('input[name="modal-user-edit-gender"]').val(user.gender)
    $('#action-user-edit').attr('data-user', user.id)
})
$('#action-user-edit').click(function() {
    const id = Number($(this).attr('data-user'))
    const admin = $('#admin-username').attr('data-admin')
    $.ajax({
        type: 'put',
        url: `${admin}/edit`,
        data: {
            id,
            username: $('#modal-user-edit-username').val(),
            email: $('#modal-user-edit-email').val(),
            gender: $('input[name="modal-user-edit-gender"]').val()
        },
        success: function(res, status, xhr) {
            if (res.success) {
                console.log(res.message)
                setTimeout(function() {
                    window.location.href = `${admin}`
                }, 500)
            } else {
                console.log(res.message)
            }
        },
        error: function(xhr, status, error) {
            console.log(error)
        }
    })
})