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
            if ($(this).hasClass('profile-active'))
            {
                $(this).removeClass('profile-active');
            }
        });

        $(this).toggleClass('profile-active');

        if (!$(".grid__item").is(":visible")) {
            $(".grid__item").velocity("transition.slideUpIn", { duration: 250, easing: [250, 60], stagger: 100, display: "flex" });
        }
        
    });



    $('.news-menu, .att-menu, .about-menu').click(function() {
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