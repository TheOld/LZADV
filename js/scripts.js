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

    //$('body').scrollToTop({
    //    animation: 'fade',
    //    text: 'Voltar ao topo',
    //    skin: 'square'
    //});

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
                }, 360);
                return false;
            }
        }
    });
});

$(window).scroll(function () {
    //console.log($(this).scrollTop());

    //Attorney section
    //if ($(this).scrollTop() >= 700 && $(this).scrollTop() < 2110) {
    //    $('#open-button').removeClass('menu-buttonLight');
    //    $('.sticky-menu li a').addClass('dark-menu');
    //}

    //what we do section
    //if ($(this).scrollTop() >= 2115 && $(this).scrollTop() < 3819) {
    //    $('#open-button').addClass('menu-buttonLight');
    //    $('.sticky-menu li a').removeClass('dark-menu');
    //}


    //if ($(this).scrollTop() >= 3820) {
    //    $('#open-button').removeClass('menu-buttonLight');
    //    $('.sticky-menu li a').addClass('dark-menu');
    //}

    //if ($(this).scrollTop() >= 9885) {
    //    $('#open-button').addClass('menu-buttonLight');
    //    $('.sticky-menu li a').removeClass('dark-menu');
    //}

    if ($(this).scrollTop() > 550) {
        $('.sticky-menu').addClass('sticky-menu--active');
    }
    else {
        $('.sticky-menu').removeClass('sticky-menu--active');
    }
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

    $('.att-container, .flexslider, .media, .news, .fake-chimp, .about').waypoint(function () {
        $('#open-button').removeClass('menu-buttonLight');
        
            //$('.sticky-menu li a').addClass('dark-menu');
    }, {offset:'5%'});

    //Advogados
    $('.work, .grid, .contact').waypoint(function () {
        if (!$('#open-button').hasClass('menu-buttonLight')) {
            $('#open-button').addClass('menu-buttonLight');
        }
        //$('.sticky-menu li a').removeClass('dark-menu');
    }, {offset:'5%'});

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated bounceInLeft');
    }, {
        offset: '85%'
    });

    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated bounceInRight');
    }, {
        offset: '85%'
    });


    
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInUp');
    }, {
        offset: '85%'
    });

    $('.wpLogo').waypoint(function () { $('.wpLogo').addClass('animated bounceInLeft'); },
        { offset: '85%' });

    //about us
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInUp');
    }, {
        offset: '85%'
    });

    //media

    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInUp');
    }, {
        offset: '85%'
    });



    $('#collapseEmp').waypoint(function () {

        //if (!$('#open-button').hasClass('menu-buttonLight'))
        //    $('#open-button').removeClass('menu-buttonLight');


    }, {
        offset: '85%'
    });


    //publications
    $('.wp6').waypoint(function () {

        $('#open-button').removeClass('menu-buttonLight');

        $('.sticky-menu li a').addClass('dark-menu');

        $('.wp6').addClass('animated fadeInUp');
    }, {
        offset: '85%'
    });
    //publications
    $('.wp7').waypoint(function () {


        $('.wp6').addClass('animated fadeInUp');
    }, {
        offset: '85%'
    });

});



//POST
$(document).ready(function () {

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



    $('.profile').click(function () {

        var authorID = $(this).data('id');

        //maybe add some animation (fade out main page?)

        window.location.href = "/Post/PostList?userID=" + authorID;


        

    });

    //login click function
    [].slice.call(document.querySelectorAll('button.login-progress-button')).forEach(function (bttn) {
        new ProgressButton(bttn, {
            callback: function (instance) {


                var progress = 0,
                    interval = setInterval(function () {
                        progress = Math.min(progress + Math.random() * 0.1, 1);
                        //if (true) {
                        instance._setProgress(progress);


                        ProcessLogin();

                        instance._stop(1);
                        clearInterval(interval);



                        //} else {
                        //    instance._stop(-1);
                        //    clearInterval(interval);
                        //}

                        //if (progress === 1) {
                        //    instance._stop(1);
                        //    clearInterval(interval);
                        //}
                    }, 200);
            }
        });
    });


});



function ProcessLogin() {
    try {

        var _user = {
            Name: '',
            Email: $('#username').val(),
            Password: $('#password').val()
        };


        $.ajax({
            url: "/User/logOn",
            type: 'POST',
            data: JSON.stringify({ user: _user }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (result) {

                if (result !== "fail") {
                    window.location.href = "/Home/BlogAdmin?userID=" + result;
                    $('#login-modal').modal('hide');
                } else {
                    $('#login-modal').velocity("callout.shake", { duration: 360 }, 'easeInOutQuint');
                }

            },
            error: function (result) {
                //errorFetchingPosts(result);
                console.log(result);
            }
        });
    } catch (e) {
        console.log(e);
    }
};

