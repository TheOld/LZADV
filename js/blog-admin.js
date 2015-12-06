$(document).ready(function () {

    getPostList();

    $('#close-post-editor').click(function () {
        $('#post-editor').velocity('transition.slideDownBigOut', { duration: 200 }, 'easeOutQuint');
    });


    $('#new-post').click(function () {
        $('#post-editor').velocity('transition.slideUpBigIn', { duration: 250 }, 'easeOutQuint');
    });



});

//TODO: get all posts from the logged user and add to the table
function getPostList() {
    var authorID = $('#id').val();
    $.ajax({
        url: "/Post/list?filter=&page=0&userID=" + authorID,
        type: 'GET',
        success: function (result) {
            $('#post-table > tbody').empty();
            $(result).each(function () {
                buildTable(this);

            });
            $('.edit-post').on('click', editPost);
            $('.delete-post').on('click', deletePost);
        },
        error: function (result) {
            console.log(result);
        }
    });
};


function buildTable(post) {
    try {

        var date = new Date(parseInt(post.Date.substr(6), 10));
        var date2 = new Date(date);
        post.ID = 0;
        var row = '<tr><th scope="row">' + post.ID + '</th>' +
                        '<td>' + post.Title + '</td>' +
                        '<td>' + date2 + '</td>' +
                        '<td><a class="text-center edit-post" data-id="' + post.ID + '" href="#">Editar</a></td>' +
                        '<td><a class="text-center delete-post" data-id="' + post.ID + '" href="#">Excluir</a></td>' +
                    '</tr>';



        $('#post-table > tbody').append(row);

    } catch (e) {
        console.log(e);
    }
};

function insertPost() {
    try {




        var post = {
            Content: $("#post-body").html(),
            Category: $("#category").text(),
            Title: $("#title").val(),
            Author: 
        };

        //public String _ID { get { return Id != null ? Id.ToString() : null; } }
        //public DateTime Date { get; set; }
        //public String Content { get; set; }
        //public String Category { get; set; }
        //public String Title { get; set; }
        //public User Author { get; set; }

        $.ajax({
            url: "/Post/save",
            data:{post: post},
            type: 'POST',
            success: function (result) {
                console.log(result);
            },
            error: function (result) {
                //errorFetchingPosts(result);
                console.log(result);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function editPost() {
    try {
        var id = $(this).data('id');
        console.log(id);
    } catch (e) {

    }
}

function deletePost() {
    try {
        alert('delete');
    } catch (e) {

    }
}

//
function savePost(id, post) {
    try {
        $.ajax({
            url: "/Post/save",
            data: { _ID: id, post: post },
            type: 'POST',
            success: function (result) {
                console.log(result);
            },
            error: function (result) {
                //errorFetchingPosts(result);
                console.log(result);
            }
        });
    } catch (e) {
        console.log(e);
    }

}