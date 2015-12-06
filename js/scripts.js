//FLEXSLIDER
$(window).load(function () {
    $('.flexslider').flexslider({
        animation: "slide",
        directionNav: true,
        controlNav: false,
        slideshow: false,
        randomize: true,
    });

    $(function () {
        var pull = $('#pull');
        var menu = $('nav ul.clearfix');

        $(pull).on('click', function (e) {
            e.preventDefault();
            menu.slideToggle();
        });
    });
    var menuu = $('nav ul');
    if (menuu.is(':hidden')) {

        $('#restricted').attr('hidden', 'hidden');
        $('#restricted-mobile').removeAttr('hidden');
    }

    $(window).resize(function () {
        var menu = $('nav ul');
        var w = $(window).width();
        if (w > 320 && menu.is(':hidden')) {
            menu.removeAttr('style');



        }
    });




});


//OVERLAYS
$(document).ready(function () {
    $(".grid__item").hide();

    $('.profile').click(function () {
        $('.profile-container figure').each(function () {
            if ($(this).hasClass('profile-active')) {
                $(this).removeClass('profile-active');
            }
        });

        $(this).toggleClass('profile-active');

        if (!$(".grid__item").is(":visible")) {
            $(".grid__item").velocity("transition.slideUpIn", { duration: 250, easing: [250, 60], stagger: 100, display: "flex" });
        }

    });



    $('.news-menu, .att-menu, .about-menu').click(function () {
        if ($('#open-button').hasClass('menu-buttonLight'))
            $('#open-button').removeClass('menu-buttonLight');
    });

    $('.work-menu, .contact-menu').click(function () {
        if (!$('#open-button').hasClass('menu-buttonLight'))
            $('#open-button').addClass('menu-buttonLight');
    });

    //$('#end').modal('show');

    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".effects .img").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".effects .img").mouseenter(function () {
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function () {
            $(this).removeClass("hover");
        });
    }

    $('body').scrollToTop({
        animation: 'fade',
        text: 'Voltar ao topo',
        skin: 'square'
    });

    //$(".main").onepage_scroll();
    [].slice.call(document.querySelectorAll('button.progress-button')).forEach(function (bttn) {
        new ProgressButton(bttn, {
            callback: function (instance) {

                var nameError = "Por favor informe seu nome.";
                var emailError = "Seu email deve obedecer o formato nome@dominio.com.br";
                var requiredEmail = "Por favor informe seu email.";
                var messageError = "Por favor digite uma mensagem.";

                if ($("#contact-form").hasClass("formEN")) {
                    nameError = "Please type your name";
                    emailError = "The provided mail address is invalid.";
                    messageError = "Please write a message";
                    requiredEmail = "Please inform your e-mail";
                }

                $('#contact-form').validate(
                  {
                      errorClass: "error-form",
                      messages: {
                          name: nameError,
                          message: messageError,
                          email: {
                              required: requiredEmail,
                              email: emailError
                          }
                      }
                  });

                var progress = 0,
                    interval = setInterval(function () {
                        progress = Math.min(progress + Math.random() * 0.1, 1);


                        if ($("#contact-form").valid()) {
                            instance._setProgress(progress);
                            var name = $('#name').val();
                            var email = $('#email').val();
                            var message = $('#message').val();
                            var phone = $('#phone').val();
                            $.ajax({
                                url: "/Home/SendContactMail",
                                type: 'POST',

                                data: { email: email, name: name, messageContact: message, phone: phone },
                                async: false,
                                success: function () {

                                    $('#name').val('');
                                    $('#email').val('');
                                    $('#message').val('');
                                    $('#phone').val('');

                                    $('#successlabel').removeClass('hidden');
                                    setTimeout(function () {
                                        $('#successlabel').addClass('hidden');

                                    }, 4500);

                                    instance._stop(1);
                                    clearInterval(interval);
                                },
                                error: function () {
                                    $('#errorlabel').removeClass('hidden');
                                    setTimeout(function () { $('#errorlabel').addClass('hidden'); }, 4500);
                                    instance._stop(-2);
                                    clearInterval(interval);
                                }
                                //OnSuccess
                            });
                        } else {
                            instance._stop(-1);
                            clearInterval(interval);
                        }

                        //if (progress === 1) {
                        //    instance._stop(1);
                        //    clearInterval(interval);
                        //}
                    }, 200);
            }
        });
    });


    //login click function
    [].slice.call(document.querySelectorAll('button.login-progress-button')).forEach(function (bttn) {
        new ProgressButton(bttn, {
            callback: function (instance) {


                var progress = 0,
                    interval = setInterval(function () {
                        progress = Math.min(progress + Math.random() * 0.1, 1);
                        if (true) {
                            instance._setProgress(progress);
                            setTimeout(function () {
                                $('#login-modal').modal('hide');
                                window.location.href = "/home/BlogAdmin";

                            }, 3000);

                            instance._stop(1);
                            clearInterval(interval);



                        } else {
                            instance._stop(-1);
                            clearInterval(interval);
                        }

                        //if (progress === 1) {
                        //    instance._stop(1);
                        //    clearInterval(interval);
                        //}
                    }, 200);
            }
        });
    });

});


// SMOOTH NAV SCROLL 
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });
});

//FLOATING MENU
(function () {

    var bodyEl = document.body,
		content = document.querySelector('.content-wrap'),
		openbtn = document.getElementById('open-button'),
		closebtn = document.getElementById('close-button'),
		isOpen = false;

    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.addEventListener('click', toggleMenu);
        if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
        }

        // close the menu element if the target it´s not the menu element or one of its descendants..
        content.addEventListener('click', function (ev) {
            var target = ev.target;
            if (isOpen) {
                toggleMenu();
            }
        });
    }

    function toggleMenu() {
        if (isOpen) {
            classie.remove(bodyEl, 'show-menu');
        }
        else {
            classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
    }

    init();

    $('.icon-list a').click(function () { toggleMenu(); })


})();


// WAYPOINTS
$(function () {

    $('.wp1').waypoint(function () {
        if (!$('#open-button').hasClass('hidden'))
            $('#open-button').addClass('hidden');



        $('.wp1').addClass('animated bounceInLeft');
    }, {
        offset: '85%'
    });

    $('.wp2').waypoint(function () {
        if ($('#open-button').hasClass('hidden'))
            $('#open-button').removeClass('hidden');




        $('.wp2').addClass('animated bounceInRight');
    }, {
        offset: '85%'
    });

    $('.wp3').waypoint(function () {

        if ($('#open-button').hasClass('hidden'))
            $('#open-button').removeClass('hidden');



        $('.wp3').addClass('animated fadeInUp');
    }, {
        offset: '85%'
    });

    $('.wpLogo').waypoint(function () { $('.wpLogo').addClass('animated bounceInLeft'); },
        { offset: '85%' });

    $('.wp4').waypoint(function () {

        if ($('#open-button').hasClass('hidden'))
            $('#open-button').removeClass('hidden');



        $('.wp4').addClass('animated fadeInUp');
    }, {
        offset: '85%'
    });

    $('.wp5').waypoint(function () {


        $('.wp5').addClass('animated fadeInUp');
    }, {
        offset: '85%'
    });



    $('#collapseEmp').waypoint(function () {

        if (!$('#open-button').hasClass('menu-buttonLight'))
            $('#open-button').removeClass('menu-buttonLight');


    }, {
        offset: '85%'
    });

    $('.wp6').waypoint(function () {


        $('.wp6').addClass('animated fadeInUp');
    }, {
        offset: '85%'
    });

});

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
    //menuCloseCtrl = sidebarEl.querySelector('.close-button');

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

        // hamburger menu button (mobile) and close cross
        //menuCtrl.addEventListener('click', function() {
        //	if( !classie.has(sidebarEl, 'sidebar--open') ) {
        //		classie.add(sidebarEl, 'sidebar--open');	
        //	}
        //});

        //menuCloseCtrl.addEventListener('click', function() {
        //	if( classie.has(sidebarEl, 'sidebar--open') ) {
        //		classie.remove(sidebarEl, 'sidebar--open');
        //	}
        //});
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

}

// #endregion


//POST
$(document).ready(function () {
    $('.profile').click(function () {

        var authorID = $(this).data('id');

        $.ajax({
            url: "/Post/list?filter=a&page=0&userID=" + authorID,
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

        $('.profile-container figure').each(function () {
            if ($(this).hasClass('profile-active')) {
                $(this).removeClass('profile-active');
            }
        });
        $(this).toggleClass('profile-active');
        if (!$(".grid__item").is(":visible")) {
            $(".grid__item").velocity("transition.slideUpIn", { duration: 250, easing: [250, 60], stagger: 100, display: "flex" });
        }

    });

    $('.login-submit').click(function () {

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

}

function buildPostData(post) {

    var fullPost =
        '<span class="category category--full">' + post.Category + '</span>' +
        '<h2 class="title title--full">' + post.Title + '</h2>' +
        '<div class="meta meta--full">' +

            '<img class="meta__avatar" src="~/img/brc-circle.png" alt="Bruce Bastos Martins" />' +
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


}