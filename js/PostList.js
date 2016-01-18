
/// <reference path="blogManager.js" />
var authorID = "";


$(document).ready(function () {

    

    var inputText;
    var $matching = $();

    // Delay function
    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    $("#search-post").keyup(function () {
        // Delay function invoked to make sure user stopped typing
        delay(function () {
            inputText = $("#search-post").val().toLowerCase();

            // Check to see if input field is empty
            if ((inputText.length) > 0) {
                $('.mix').each(function () {
                    $this = $("this");

                    // add item to be filtered out if input text matches items inside the title   
                    if ($(this).children('.title').text().toLowerCase().match(inputText)) {
                        $matching = $matching.add(this);
                    } else {
                        // removes any previously matched item
                        $matching = $matching.not(this);
                    }
                });
                $("#post-list").mixItUp('filter', $matching);
            } else {
                // resets the filter to show all item if input is empty
                $("#post-list").mixItUp('filter', 'all');
            }
        }, 200);
    });

    //$('.profile-list figure:first').addClass('profile-active');
    $('.profile-list figure').each(function () {
        if ($(this).data('id') === $('#UserID').val()) {
            $(this).addClass('profile-active');
            authorID = $(this).data('id')
            getPostList();
            initMixItUp();
        }
    });

    $('.profile').click(function () {
        $('.profile-list figure').each(function () {
            if ($(this).hasClass('profile-active')) {
                $(this).removeClass('profile-active');
            }
        });

        $(this).addClass('profile-active');
        authorID = $(this).data('id');

        getPostList();

    });

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

function getPostList() {
    //var authorID = $('#UserID').val();
    $.ajax({
        url: "/Post/list?filter=&page=0&userID=" + authorID,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('.post-list').empty();
            $(result).each(function () {
                populatePostList(this);
            });

            InitPostManager();
            initMixItUp();
        },
        error: function (result) {
            console.log(result);
        }
    });
};
function checkIfImageExists(image_url) {

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status !== 404;

};
function populatePostList(post) {
    //MODELO

    //<figure class="effect-marley">
    //					<img src="img/11.jpg" alt="img11"/>
    //					<figcaption>
    //						<h2>Sweet <span>Marley</span></h2>
    //						<p>Marley tried to convince her but she was not interested.</p>
    //						<a href="#">View more</a>
    //					</figcaption>			
    //				</figure>

    //<a class="grid__item" href="#">
    //    <h2 class="title title--preview">MDIC simplifica procedimento de exporta��o</h2>
    //    <div class="loader"></div>
    //    <span class="category">Direito Aduaneiro</span>
    //    <div class="meta meta--preview">
    //        <!-- Data do post -->
    //        <span class="meta__date"><i class="fa fa-calendar-o"></i> 17/07/2015</span>
    //    </div>
    //</a>


    var dateString = post.Date.substr(6);
    var currentTime = new Date(parseInt(dateString));
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var date = day + "/" + month + "/" + year;

    var shortTitle = jQuery.trim(post.Title).substring(0, 70)
   .split(" ").slice(0, -1).join(" ") + " ...";

    var imgURL = post.PostCover;
    var imgStatus = checkIfImageExists(imgURL)

    var filterClass = "";

    if (post.Category == "Direito Aduaneiro") {
        filterClass = 'customs-law';
    } else if (post.Category == "Direito do Trabalho e Previdenciário") {
        filterClass = 'labor-law';
    }
    else if (post.Category == "Direito Tributário") {
        filterClass = 'tax-law';
    } else if (post.Category == "Direito Marítimo") {
        filterClass = 'maritime-law';
    } else if (post.Category == "Direito Internacional") {
        filterClass = 'international-law';
    } else if (post.Category == "Direito Empresarial") {
        filterClass = 'business-law';
    }

    var postItem;
    if (imgStatus) {
        var postBG = 'style="background-image: url(' + imgURL + ');Background-size: cover;"';
        postItem = '<a class="grid__item mix ' + filterClass + '" href="#" data-id="' + post._ID + '">' +
           '<h2 ' + postBG + ' class="title title--preview"></h2>' +
           '<div class="loader"></div>' +
           '<h4 class="font-playfair">' + shortTitle + '</h4>' +
           '<div class="meta meta--preview">' +
               '<span class="meta__date" data-date="' + date + '"><i class="fa fa-calendar-o"></i> ' + date + '</span>' +
               '<span class="category pull-ight">' + post.Category + '</span>' +
           ' </div>' +
           '</a>';

    } else {
        postItem = '<a class="grid__item mix ' + filterClass + '" href="#" data-id="' + post._ID + '">' +
           '<h2 class="title title--preview">' + shortTitle + '</h2>' +
           '<div class="loader"></div>' +
           '<h3 class="category">' + post.Category + '</h3>' +
           '<div class="meta meta--preview">' +
               '<span class="meta__date" data-date="' + date + '"><i class="fa fa-calendar-o"></i> ' + date + '</span>' +
           ' </div>' +
           '</a>';
    }





    $('.grid__item').click(function (e) { e.preventDefault; })
    $('.post-list').append(postItem);

};

function getUserData(post) {
    try {
        $.ajax({
            type: "GET",
            url: "/User/getUserData",
            data: { UserID: authorID },
            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (response) {

                buildPostData(post, response);
            }
        });

    } catch (e) {
        alert(e);
    }
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

    //<div class="skype-status" data-id="brc">

    //                            <div id="SkypeButton_Call_brucebastos13_1" class="post-view-skype">
    //                                <span class="pull-right">Ler artigos</span>
    //                            </div>
    //                            <div class="skype-status hidden" data-id="brn">

    //                                <div id="SkypeButton_Call_lobo.brunoo_1" class="post-view-skype">
    //                                    <span class="pull-right">Ler artigos</span>
    //                                </div>
    //                            </div>
    //                            <div class="skype-status hidden" data-id="gbr">

    //                                <div id="SkypeButton_Call_facebook:gssouto_1" class="post-view-skype">
    //                                    <span class="pull-right">Ler artigos</span>
    //                                </div>
    //                            </div>
    //                            <div class="skype-status hidden" data-id="rfl">

    //                                <div id="SkypeButton_Call_rafaelpopini_1" class="post-view-skype">
    //                                    <span class="pull-right">Ler artigos</span>
    //                                </div>
    //                            </div>

    //                        </div>

    var skypeBruce   = 'SkypeButton_Call_brucebastos13_1';
    var skypeBruno   = 'SkypeButton_Call_lobo.brunoo_1';
    var skypeGabriel = 'SkypeButton_Call_facebook:gssouto_1';
    var skypeRafael  = 'SkypeButton_Call_rafaelpopini_1';

    var mailBruce   = 'bruce@lzadv.com.br';
    var mailBruno   = 'bruno@lzadv.com.br';
    var mailGabriel = 'gabriel@lzadv.com.br';
    var mailRafael  = 'rafael@lzadv.com.br';

    var skypeContact = '';
    var mail         = '';

    if (user.Name === "Bruce Bastos Martins") {
        skypeContact = skypeBruce;
        mail         = mailBruce;
    } else if (user.Name === "Bruno Eduardo Budal Lobo") {
        skypeContact = skypeBruno;
        mail         = mailBruno;
    } else if (user.Name === "Gabriel Souto da Silva") {
        skypeContact = skypeGabriel;
        mail         = mailGabriel;
    } else {
        skypeContact = skypeRafael;
        mail         = mailRafael;
    }

    var fullPost =
        '<span class="category category--full">' + post.Category + '</span>' +
        '<h2 class="title title--full">' + post.Title + '</h2>' +
        '<div class="meta meta--full">' +

            '<img class="meta__avatar" src="../img/' + user.Name + '.png" alt="' + user.Name + '" />' +

            '<span class="meta__author">' + user.Name + '</span>' +
            '<span class="meta__date"><i class="fa fa-calendar-o"></i>' + date + '</span>' +
            '<span class="meta__misc meta__misc--seperator">' +
                '<a href="mailto:"' + mail + '">' + mail + '</a>' +

                '<div class="fb-share-button margin-top-10" data-href="http://www.lzadv.com.br/post/postview?id=' + post._ID + '" data-layout="button"></div>' +
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
                '</div>' +
        '</div>';
    document.title = post.Title;

    $('.content__item').append(fullPost);

    //InitFBComments();


};

function showOptionsMenu() {
    $('.options-container').velocity('transition.perspectiveDownIn', { duration: 300 }, 'easeOutQuint');
}
function hideOptionsMenu() {
    $('.options-container').velocity('transition.perspectiveDownOut', { duration: 300 }, 'easeOutQuint');
}

// #region Facebook API


function InitFBComments() {

    $('body').ajaxComplete(function () { FB.XFBML.parse(document.body) });


};
// #endregion


function initMixItUp() {
    $('#post-list').mixItUp({
        animation: {
            duration: 260,
            effects: 'fade translateY(520px) stagger(80ms)',
            easing: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
        },
        layout: {
            display: 'flex'
        }
    });
    $('#post-list').mixItUp('filter', 'all');
}

function goBack() {
    window.history.back();
}

// #region Post List Init

function InitPostManager() {

    var bodyEl = document.body,
		docElem = window.document.documentElement,
		support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		onEndTransition = function (el, callback) {
		    var onEndCallbackFn = function (ev) {
		        if (support.transitions) {
		            if (ev.target !== this) return;
		            this.removeEventListener(transEndEventName, onEndCallbackFn);
		        }
		        if (callback && typeof callback === 'function') { callback.call(this); }
		    };
		    if (support.transitions) {
		        el.addEventListener(transEndEventName, onEndCallbackFn);
		    }
		    else {
		        onEndCallbackFn();
		    }
		},
		gridEl                = document.getElementById('theGrid'),
		sidebarEl             = document.getElementById('theSidebar'),
		//gridItemsContainer  = gridEl.querySelector('section.grid'),
        gridItemsContainer    = gridEl.querySelector('section.post-list'),
		contentItemsContainer = gridEl.querySelector('section.ccontent'),
		gridItems             = gridItemsContainer.querySelectorAll('.grid__item'),
        
		//contentItems = '',
        gridItem    = '',
        contentItem = contentItemsContainer.querySelector('.content__item'),
        closeCtrl   = contentItemsContainer.querySelector('.close-button'),
        backCtrl    = contentItemsContainer.querySelector('.back-button'),
		current     = -1,
		lockScroll  = false, xscroll, yscroll,
		isAnimating = false,

		menuCtrl      = document.getElementById('menu-toggle'),
        menuCloseCtrl = sidebarEl.querySelector('.close-button');
        profile       = sidebarEl.querySelector('.profile');

    /**
	 * gets the viewport width and height
	 * based on http://responsejs.com/labs/dimensions/
	 */
    function getViewport(axis) {
        var client, inner;
        if (axis === 'x') {
            client = docElem['clientWidth'];
            inner = window['innerWidth'];
        }
        else if (axis === 'y') {
            client = docElem['clientHeight'];
            inner = window['innerHeight'];
        }

        return client < inner ? inner : client;
    }
    function scrollX() { return window.pageXOffset || docElem.scrollLeft; }
    function scrollY() { return window.pageYOffset || docElem.scrollTop; }

    function init() {

        initEvents();


    }

    function initEvents() {
        [].slice.call(gridItems).forEach(function (item, pos) {
            // grid item click event
            item.addEventListener('click', function (ev) {
                ev.preventDefault();
                if (isAnimating) {
                    return false;
                }
                isAnimating = true;
                // index of current item
                //current = pos;
                gridItem = item;
                current = 1;

                // simulate loading time..
                classie.add(item, 'grid__item--loading');
                setTimeout(function () {
                    classie.add(item, 'grid__item--animate');
                    // reveal/load content after the last element animates out (todo: wait for the last transition to finish)
                    setTimeout(function () { loadContent(item); }, 500);
                }, 1000);
            });
        });

        //closeCtrl.removeEventListener('click', hideContent);
        //closeCtrl.addEventListener('click', function () {

        //    // hide content
        //        hideContent();
        //});

        $('.close-button').off('click');
        $('.close-button').on('click', hideContent);

        // keyboard esc - hide content
        document.addEventListener('keydown', function (ev) {
            if (!isAnimating && current !== -1) {
                var keyCode = ev.keyCode || ev.which;
                if (keyCode === 27) {
                    ev.preventDefault();
                    if ("activeElement" in document)
                        document.activeElement.blur();
                    hideContent();
                }
            }
        });

        //hamburger menu button (mobile) and close cross
        menuCtrl.addEventListener('click', function () {

            if (!classie.has(sidebarEl, 'sidebar--open')) {
                classie.add(sidebarEl, 'sidebar--open');
            }
        });

        backCtrl.addEventListener('click', function () {
            // hide content
            hideContent();
        });

        menuCloseCtrl.addEventListener('click', function () {

            //if (classie.has(sidebarEl, 'sidebar--open')) {
            //    classie.remove(sidebarEl, 'sidebar--open');
            //}

            hideSidebar();
        });

        profile.addEventListener('click', function () {
            hideSidebar();
        });

        isInitiated = true;
        console.log('Post manager initiated');
    }

    function loadContent(item) {
        var id = $(item).data('id');
        console.log(id);
        //var content = $(item).find('div.post-content').html();
        //var category = $(item).find('span.category').html();
        //var title = $(item).find('.title').html();
        //var date = $(item).find('.meta__date').data('date');


        //var post = {
        //    Title: title,
        //    Content: content,
        //    Date: date,
        //    Category: category
        //}
        $('.content__item').empty();
        hideOptionsMenu();
        getPostById(id);
        //getUserData(post);
        //buildPostData(post);

        //contentItems = contentItemsContainer.querySelectorAll('.content__item');
        // add expanding element/placeholder 
        var dummy = document.createElement('div');
        dummy.className = 'placeholder';
        console.log(dummy);
        // set the width/heigth and position
        dummy.style.WebkitTransform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth / gridItemsContainer.offsetWidth + ',' + item.offsetHeight / getViewport('y') + ',1)';
        dummy.style.transform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth / gridItemsContainer.offsetWidth + ',' + item.offsetHeight / getViewport('y') + ',1)';

        // add transition class 
        classie.add(dummy, 'placeholder--trans-in');

        // insert it after all the grid items
        gridItemsContainer.appendChild(dummy);

        // body overlay
        classie.add(bodyEl, 'view-single');

        setTimeout(function () {
            // expands the placeholder
            dummy.style.WebkitTransform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
            dummy.style.transform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
            // disallow scroll
            window.addEventListener('scroll', noscroll);
        }, 25);

        onEndTransition(dummy, function () {
            // add transition class 
            classie.remove(dummy, 'placeholder--trans-in');
            classie.add(dummy, 'placeholder--trans-out');
            // position the content container
            contentItemsContainer.style.top = 0 + 'px';
            // show the main content container
            classie.add(contentItemsContainer, 'content--show');
            // show content item:
            classie.add(contentItem, 'content__item--show');


            // show close control
            classie.add(closeCtrl, 'close-button--show');
            // sets overflow hidden to the body and allows the switch to the content scroll
            classie.addClass(bodyEl, 'noscroll');

            isAnimating = false;
        });
    }

    function hideSidebar() {
        if (classie.has(sidebarEl, 'sidebar--open')) {
            classie.remove(sidebarEl, 'sidebar--open');
        }
    }

    function hideContent() {
        //var gridItem = gridItems[current];//, contentItem = $('.content__item');//contentItems[current];

        classie.remove(contentItem, 'content__item--show');
        classie.remove(contentItemsContainer, 'content--show');
        classie.remove(closeCtrl, 'close-button--show');
        classie.remove(bodyEl, 'view-single');

        setTimeout(function () {
            var dummy = gridItemsContainer.querySelector('.placeholder');
            console.log(dummy);
            classie.removeClass(bodyEl, 'noscroll');

            dummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth / gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight / getViewport('y') + ',1)';
            dummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth / gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight / getViewport('y') + ',1)';

            onEndTransition(dummy, function () {
                // reset content scroll..
                contentItem.parentNode.scrollTop = 0;
                gridItemsContainer.removeChild(dummy);
                classie.remove(gridItem, 'grid__item--loading');
                classie.remove(gridItem, 'grid__item--animate');
                lockScroll = false;
                window.removeEventListener('scroll', noscroll);

                showOptionsMenu();
            });

            // reset current
            //current = -1;



        }, 25);

    }

    function noscroll() {
        if (!lockScroll) {
            lockScroll = true;
            xscroll = scrollX();
            yscroll = scrollY();
        }
        window.scrollTo(xscroll, yscroll);
    }

    init();

};

// #endregion
