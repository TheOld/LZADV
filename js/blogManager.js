function getPostList(authorID) {
    //var authorID = $('#id').val();
    $.ajax({
        url: "/Post/list?filter=&page=0&userID=" + authorID,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
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