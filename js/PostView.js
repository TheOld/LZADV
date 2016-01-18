window.addEventListener('scroll', noscroll);

$(document).ready(function () {
    
    //getPostById($("PostID").val())

    $('.close-button').click(function () {
        var authorID = $(this).data('id');

        window.location.href = "/Post/PostList?userID=" + authorID;
    });
    
    Skype.ui({
        "name": "chat",
        "element": "SkypeButton_Call_brucebastos13_1",
        "participants": ["brucebastos13"],
        "imageSize": 24

    });

    //Skype Rafael
    Skype.ui({
        "name": "chat",
        "element": "SkypeButton_Call_rafaelpopini_1",
        "participants": ["rafaelpopini"],
        "imageSize": 24
    });

    //Skype Bruno

    Skype.ui({
        "name": "chat",
        "element": "SkypeButton_Call_lobo.brunoo_1",
        "participants": ["lobo.brunoo"],
        "imageSize": 24
    });

    //Skype Gabriel

    Skype.ui({
        "name": "chat",
        "element": "SkypeButton_Call_facebook:gssouto_1",
        "participants": ["facebook:gssouto"],
        "imageSize": 24
    });

    //rafaelpopini


    $('.skype-status div').attr('style', '');
    $('.skype-status div p').addClass('skype-button');
    $('.skype-button a').click(function (e) {
        e.stopPropagation();
    })

});

function getPostById(ID) {
    $.ajax({
        url: "/Post/get",
        data: { id: ID },
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            getUserData(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function getUserData(post) {
    try {
        $.ajax({
            type: "GET",
            url: "/User/getUserData",
            data: { UserID: post.Author },
            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (response) {

                buildPostData(post, response);
            }
        });

    } catch (e) {
        alert(e);
    }
};

function noscroll() {
    if (!lockScroll) {
        lockScroll = true;
        xscroll = scrollX();
        yscroll = scrollY();
    }
    window.scrollTo(xscroll, yscroll);
}

function buildPostData(post, user) {

    var dateString = post.Date.substr(6);
    var currentTime = new Date(parseInt(dateString));
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var date = day + "/" + month + "/" + year;

    //<span class="meta__misc meta__misc--seperator"><i class="fa fa-comments-o"></i> 7 comments</span>
    //<span class="meta__misc"><i class="fa fa-heart"></i> 12 favorites</span>
    //<nav class="article-nav">
    //	<button><i class="fa fa-angle-left"></i> <span>Previous</span></button>
    //	<button><span>Next</span> <i class="fa fa-angle-right"></i></button>
    //</nav>

    $(document).title("Lobo & Vaz Advogados Associados - " + post.Title)
    
    var fullPost =
        '<span class="category category--full">' + post.Category + '</span>' +
        '<h2 class="title title--full">' + post.Title + '</h2>' +
        '<div class="meta meta--full">' +

            '<img class="meta__avatar" src="../img/' + user.Name + '.png" alt="' + user.Name + '" />' +

            '<span class="meta__author">' + user.Name + '</span>' +
            '<span class="meta__date"><i class="fa fa-calendar-o"></i>' + date + '</span>' +
            '<span class="meta__misc meta__misc--seperator">' +
                '<div class="fb-share-button" data-href="http://www.lzadv.com.br/post/postview?id=' + post._ID + '" data-layout="button"></div>' +
            '</span>' +

        '</div>' +

        '<hr />' +
        '<div><p>' + post.Content + '</p></div>' +
        //<!-- Facebook comments plugin -->
        '<div class="container">' +
        '<div class="row">' +
            '<div class="col-md-6">' +
                '<div id="fb-root"></div>' +
                '<script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script>' +
                //TODO: substituir post.Title por post.ID
                '<div class="fb-comments" data-href="http://www.lzadv.com.br/post/' + post.Title + '" data-numposts="5"></div>' +
                '<script>FB.XFBML.parse();</script>' +
            '</div>' +
            //'<div class="col-md-2">'+
            //    '<a class="btn btn-default fb-share" href="javascript:fbshareCurrentPage()" target="_blank" alt="Share on Facebook">Compartilhar</a>' +
            //'</div>' +
            '</div>' +
        '</div>';
    document.title = post.Title;

    $('.content__item').append(fullPost);

    //InitFBComments();
};