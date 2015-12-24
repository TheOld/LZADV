var files;
$(document).ready(function () {

    getPostList();

    getUserData();
    $('#close-post-editor, #cancel-post-edit').click(function () {
        hideForm();
    });

    $('#show-profile-editor').click(function () { showProfileEditor(); })

    $('#close-profile-editor').click(function () { hideProfileEditor(); })

    $('#new-post').click(function () {
        $('#title').val('');
        $('#category').val('- Categoria -');
        tinyMCE.activeEditor.setContent("");

        var now = new Date();

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear() + "-" + (month) + "-" + (day);

        $('#post-date').val(today);

        $('#post-editor').velocity('transition.slideUpBigIn', { duration: 250 }, 'easeOutQuint');
    });

    $('#btn-save-post').click(function () {

        //var isEnabled = false;

        //if ($('#isActive').is(":checked")) {
        //    isEnabled = true;
        //}

        var post = {
            _ID: '000000000000000000000000',
            Author: $('#id').val(),
            Category: $("#category").children("option").filter(":selected").text(),
            Title: $("#title").val(),
            Content: tinyMCE.activeEditor.getContent(),
            IsEnable: true,
            Date: $('#post-date').val(),
            PostCover: "../img/" + $('#txtUploadFile').val().split('\\').pop()
        };

        if ($('#selected-post-id').val())
            post._ID = $('#selected-post-id').val();

        insertPost(post);

        
        


    });

    $('#txtUploadFile').on('change', function (e) {
        files = e.target.files;
        //uploadFiles();
    });

    $('#profile-pic-input').change(function (e) {
        files = e.target.files;
        saveProfilePicture(true);
    });


    $('#btnSaveProfile').click(function () {

        var nameError = "Por favor informe seu nome.";
        var emailError = "Seu email deve obedecer o formato nome@dominio.com.br";
        var requiredEmail = "Por favor informe seu email.";
        var passwordError = "Por favor informe a nova senha.";

        $('#profile-editor-form').validate(
          {
              errorClass: "error-form",
              messages: {
                  name: nameError,
                  password: passwordError,
                  email: {
                      required: requiredEmail,
                      email: emailError
                  }
              }
          });

        if (checkPassword()) {
            var user = {
                _ID: $('#id').val(),
                Name: $('#profile-name').val(),
                Email: $("#profile-email").val(),
                Password: $('#profile-pw').val()
            };

            saveProfileData(user);
        } else {
            showMessage('alert-warning', 'Nova senha e confirmação de senha não conferem.');
        }

    });

    $('.toggle-table').click(function () {

        if ($('#active-post-list').is(':visible')) {
            $(this).html('<i class="fa fa-list"></i> Posts ativos');

            $('#active-post-list').velocity('transition.slideLeftOut', { duration: 260 }, 'easeOut', {
                complete:
                    $('#inactive-post-list').velocity('transition.bounceRightIn', { duration: 340, delay: 280 }, 'easeOut')
            });
        } else {
            $(this).html('<i class="fa fa-list"></i> Posts inativos');

            $('#inactive-post-list').velocity('transition.slideRightOut', { duration: 260 }, 'easeOut', {
                complete:
                    $('#active-post-list').velocity('transition.bounceLeftIn', { duration: 340, delay: 280 }, 'easeOut')
            });
        }
    });

});

function checkPassword() {
    var passwordVal = $("input[name=profile-pw]").val();
    var checkVal = $("input[name=profile-pw-check]").val();
    if (passwordVal === checkVal) {
        return true;
    }
    return false;
};

//TODO: get all posts from the logged user and add to the table
function getPostList() {
    var authorID = $('#id').val();
    $.ajax({
        url: "/Post/list?filter=&page=0&userID=" + authorID,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#active-post-table > tbody').empty();

            $(result).each(function () {
                buildTable(this, true);

            });
            $('.edit-active-post, .toggle-post').off('click');
            $('.edit-active-post').on('click', editPost);
            $('.toggle-post').on('click', deletePost);
        },
        error: function (result) {
            console.log(result);
        }
    });

    $.ajax({
        url: "/Post/listInactive?filter=&page=0&userID=" + authorID,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#inactive-post-table > tbody').empty();

            $(result).each(function () {
                buildTable(this, false);

            });
            $('.edit-inactive-post, .toggle-post').off('click');
            $('.edit-inactive-post').on('click', editPost);
            $('.toggle-post').on('click', deletePost);
        },
        error: function (result) {
            console.log(result);
        }
    });
};

function getUserData() {
    try {
        $.ajax({
            type: "GET",
            url: "/User/getUserData",
            data: { UserID: $('#id').val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (response) {

                $('#profile-name').val(response.Name);
                $('#profile-email').val(response.Email);
                $('#profile-pic').attr('src', "../img/" + response.Name + ".png");


                $('#username').html(response.Name);
            }
        });

    } catch (e) {
        alert(e);
    }
};

function editPost() {
    try {
        var id = $(this).data('id');
        $('#selected-post-id').val(id);
        $.ajax({
            type: "GET",
            url: "/Post/get",
            data: "id=" + id,
            dataType: "json",
            success: function (response) {
                $('#title').val(response.Title);
                tinyMCE.activeEditor.setContent(response.Content);
                $('#category').val(response.Category);

                var dateString = response.Date.substr(6);
                var currentTime = new Date(parseInt(dateString));
                var month = currentTime.getMonth() + 1;
                var day = currentTime.getDate();
                var year = currentTime.getFullYear();
                //    var date = day + "/" + month + "/" + year;

                var date = year + "-" + (month) + "-" + (day);

                $('#post-date').val(date);
                $('#post-cover-preview').attr('src', response.PostCover).removeClass('hidden');
                showForm();

            }
        });

    } catch (e) {
        showMessage("alert-danger", e.message);

    }
};

function buildTable(post, listStatus) {
    try {
        console.log(post.Date);
        var dateString = post.Date.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var date = day + "/" + month + "/" + year;


        var shortTitle = jQuery.trim(post.Title).substring(0, 120)
    .split(" ").slice(0, -1).join(" ") + " ...";

        var targetTable = $('#active-post-table > tbody');
        var editPostClass = 'edit-active-post';
        var toggleText = "Desativar post";

        if (listStatus === false) {
            targetTable = $('#inactive-post-table > tbody');
            editPostClass = 'edit-inactive-post';
            toggleText = "Ativar post";
        }

        var row =   '<tr>'+
                        '<td title="'+ post.Title +'">' + post.Title + '</td>' +
                        '<td>' + date + '</td>' +
                         '<td class="info"><a class="text-center ' + editPostClass + '" data-id="' + post._ID + '" href="#">Editar</a></td>' +
                        '<td class="danger"><a class="text-center toggle-post" data-id="' + post._ID + '" href="#">'+ toggleText +'</a></td>' +
                    '</tr>';

        $(targetTable).append(row);

    } catch (e) {
        console.log(e);
    }
};



function insertPost(post) {
    try {

        $.ajax({
            url: "/Post/save",
            data: JSON.stringify({ _ID: post._ID, post: post }),
            headers: { "autentication-x": $('#id').val() },
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                uploadFiles();
                getPostList();
                showMessage("alert-success", "Post salvo com sucesso.");
                hideForm();
            },
            error: function (result) {
                showMessage("alert-danger", result);
            }
        });
    } catch (e) {
        showMessage("alert-danger", e);
    }
};

//
function updatePost(post) {
    try {
        $.ajax({
            url: "/Post/save",
            data: JSON.stringify({ _ID: post._ID, post: post }),
            headers: { "autentication-x": $('#id').val() },
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                getPostList();
                showMessage("alert-success", "Post editado com sucesso.");
                hideForm();
            },
            error: function (result) {
                //errorFetchingPosts(result);
                showMessage("alert-danger", result);
            }
        });
    } catch (e) {
        showMessage("alert-danger", e);
    }

};
function deletePost() {
    try {

        var id = $(this).data('id');
        $('#selected-post-id').val(id);
        

        $.ajax({
            url: "/Post/toggle",
            data: JSON.stringify({ _ID: id }),
            headers: { "autentication-x": $('#id').val() },
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                getPostList();
                if (result) {
                    showMessage("alert-success", "Post ativado com sucesso.");
                } else {
                    showMessage("alert-success", "Post desativado com sucesso.");
                }
               
                hideForm();
            },
            error: function (result) {
                //errorFetchingPosts(result);
                showMessage("alert-danger", result);
            }
        });
    } catch (e) {
        showMessage("alert-danger", e.message);
    }
};
function showMessage(cssClass, message) {


    $('#notification').html(message).addClass(cssClass).velocity('transition.bounceDownIn', { duration: 320 }, 'easeOutQuint');
    hideMessage(cssClass)
};

function hideMessage(cssClass) {
    window.setTimeout(function () {
        $('#notification').velocity('transition.bounceUpOut', { duration: 260 }, 'easeOutQuint').removeClass(cssClass).html('');
    }, 3500);
};

function showForm() {
    $('#post-editor').velocity('transition.bounceUpIn', { duration: 375 }, 'easeOutQuint');
};

function hideForm() {
    $('#post-editor').velocity('transition.bounceDownOut', { duration: 250 }, 'easeOutQuint');
};

//
function showProfileEditor() {
    $('#profile-editor').velocity('transition.bounceUpIn', { duration: 375 }, 'easeOutQuint');
};

function hideProfileEditor() {
    $('#profile-editor').velocity('transition.bounceDownOut', { duration: 260 }, 'easeOutQuint');
};

function saveProfilePicture() {
    if (files.length > 0) {
        if (window.FormData !== undefined) {
            var data = new FormData();
            for (var x = 0; x < files.length; x++) {
                data.append("file" + x, files[x]);
            }

            $.ajax({
                type: "POST",
                url: '/Home/UploadProfilePic',
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {

                    
                        $('#profile-pic').attr('src', result);
                   
                },
                error: function (xhr, status, p3, p4) {
                    var err = "Error " + " " + status + " " + p3 + " " + p4;
                    if (xhr.responseText && xhr.responseText[0] === "{")
                        err = JSON.parse(xhr.responseText).Message;
                    console.log(err);
                }
            });
        } else {
            alert("This browser doesn't support HTML5 file uploads!");
        }
    }
};

function uploadFiles() {
    // var files = $('#txtUploadFile').files;
    //var myID = 3; //uncomment this to make sure the ajax URL works
    console.log(files);
    if (files.length > 0) {
        if (window.FormData !== undefined) {
            var data = new FormData();
            for (var x = 0; x < files.length; x++) {
                data.append("file" + x, files[x]);
            }

            $.ajax({
                type: "POST",
                url: '/Home/UploadFile',
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {
                    $("#post-cover-preview").attr('src', result);
                    console.log(result);
                },
                error: function (xhr, status, p3, p4) {
                    var err = "Error " + " " + status + " " + p3 + " " + p4;
                    if (xhr.responseText && xhr.responseText[0] === "{")
                        err = JSON.parse(xhr.responseText).Message;
                    console.log(err);
                }
            });
        } else {
            alert("This browser doesn't support HTML5 file uploads!");
        }
    }
};

function saveProfileData(User) {
    try {
        $.ajax({
            type: "POST",
            url: "/User/Update",
            data: JSON.stringify({ _ID: User._ID, user: User }),
            headers: { "autentication-x": $('#id').val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                showMessage('alert-success', "Perfil atualizado com sucesso");
                hideProfileEditor();
            }
        });
    } catch (e) {
        //console.log(e);
        showMessage('alert-danger', e.message);
    }
};
