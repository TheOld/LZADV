$(document).ready(function () {
    $.ajax({
        url: "/Post/list?filter=a&page=0&userID=" + $('#UserID').val(),
        type: 'GET',
        success: function (result) {

            $('.post-list').empty();
            $(result).each(function () {
                populatePostList(this);
            });

            InitPostManager();

        },
        error: function (result) {
            //errorFetchingPosts(result);
            console.log(result);
        }
    });

    $('.profile').click(function () {
        $('.profile-list figure').each(function () {
            if ($(this).hasClass('profile-active')) {
                $(this).removeClass('profile-active');
            }
        });

        $(this).toggleClass('profile-active');
    });

});

function populatePostList(post) {
    //MODELO
    
    //<a class="grid__item" href="#">
    //    <h2 class="title title--preview">MDIC simplifica procedimento de exporta��o</h2>
    //    <div class="loader"></div>
    //    <span class="category">Direito Aduaneiro</span>
    //    <div class="meta meta--preview">
    //        <!-- Data do post -->
    //        <span class="meta__date"><i class="fa fa-calendar-o"></i> 17/07/2015</span>
    //    </div>
    //</a>
    
    var postItem = '<a class="grid__item" href="#" data-id="' + post.ID + '">' +
        '<h2 class="title title--preview">' + post.Title + '</h2>' +
        '<div class="loader"></div>' +
        '<span class="category">' + post.Category + '</span>' +
        '<div class="hidden post-content">' + post.Content + '</div>' +
        '<div class="hidden post-author">post.Author</div>' +
        '<div class="meta meta--preview">' +
        '<span class="meta__date" data-postDate="' + post.Date + '"><i class="fa fa-calendar-o"></i> ' + post.Date + '</span>' +
        ' </div></a>';

    $('.grid__item').click(function (e) { e.preventDefault; })
    $('.post-list').append(postItem);

};

function buildPostData(post) {

    var fullPost =
        '<span class="category category--full">' + post.Category + '</span>' +
        '<h2 class="title title--full">' + post.Title + '</h2>' +
        '<div class="meta meta--full">' +

            '<img class="meta__avatar" src="../img/brc-circle.png" alt="Bruce Bastos Martins" />' +
            //TODO: replace fixed name by the variable
            '<span class="meta__author">Bruce Bastos Martins</span>' +
            '<span class="meta__date"><i class="fa fa-calendar-o"></i>' + post.Date + '</span>' +
        '</div>' +

        '<hr />' +
        '<div><p>' + post.Content + '</p></div>' +
        //<!-- Facebook comments polugin -->
        '<div class="row">' +
            '<div class="col-md-4 col-md-offset-3">' +
                '<div id="fb-root"></div>' +
                '<script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script>' +
                //TODO: substituir post.Title por post.ID
                '<div class="fb-comments" data-href="http://www.lzadv.com.br/post/' + post.Title + '" data-numposts="5"></div>' +
                '<script>FB.XFBML.parse();</script>';
    '</div>' +
'</div>' +
$('.content__item').append(fullPost);

    //InitFBComments();
};

function InitFBComments() {

    $('body').ajaxComplete(function () { FB.XFBML.parse(document.body) });


};

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
		            if (ev.target != this) return;
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
		gridEl = document.getElementById('theGrid'),
		sidebarEl = document.getElementById('theSidebar'),
		//gridItemsContainer = gridEl.querySelector('section.grid'),
        gridItemsContainer = gridEl.querySelector('section.post-list'),
		contentItemsContainer = gridEl.querySelector('section.ccontent'),
		gridItems = gridItemsContainer.querySelectorAll('.grid__item'),
		//contentItems = '',
        gridItem = '',
        contentItem = contentItemsContainer.querySelector('.content__item'),
        closeCtrl = contentItemsContainer.querySelector('.close-button'),
		current = -1,
		lockScroll = false, xscroll, yscroll,
		isAnimating = false,
		menuCtrl = document.getElementById('menu-toggle');
        menuCloseCtrl = sidebarEl.querySelector('.close-button');

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
        console.log('Post manager initiated');
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

        closeCtrl.addEventListener('click', function () {
            // hide content
            hideContent();
        });

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
        menuCtrl.addEventListener('click', function() {
        	if( !classie.has(sidebarEl, 'sidebar--open') ) {
        		classie.add(sidebarEl, 'sidebar--open');	
        	}
        });

        menuCloseCtrl.addEventListener('click', function() {
        	if( classie.has(sidebarEl, 'sidebar--open') ) {
        		classie.remove(sidebarEl, 'sidebar--open');
        	}
        });
    }

    function loadContent(item) {
        var content = $(item).find('div.post-content').html();
        var category = $(item).find('span.category').html();
        var title = $(item).find('.title').html();
        var date = $(item).find('.meta__date').data('postDate');
        var author = $(item).find('.author').html();

        var post = {
            Title: title,
            Content: content,
            Date: date,
            Category: category,
            Author: author
        }
        $('.content__item').empty();
        buildPostData(post);

        //contentItems = contentItemsContainer.querySelectorAll('.content__item');
        // add expanding element/placeholder 
        var dummy = document.createElement('div');
        dummy.className = 'placeholder';

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

    function hideContent() {
        //var gridItem = gridItems[current];//, contentItem = $('.content__item');//contentItems[current];

        classie.remove(contentItem, 'content__item--show');
        classie.remove(contentItemsContainer, 'content--show');
        classie.remove(closeCtrl, 'close-button--show');
        classie.remove(bodyEl, 'view-single');

        setTimeout(function () {
            var dummy = gridItemsContainer.querySelector('.placeholder');

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
