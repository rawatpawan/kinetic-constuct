/**
 * KINETIC CONSTRUCTION - Main JavaScript File
 * Modern 3D Exhibition & Event Portfolio Website
 */

$(document).ready(function() {
    'use strict';

    // ==========================================
    // PRELOADER
    // ==========================================
    $(window).on('load', function() {
        setTimeout(function() {
            $('#preloader').addClass('loaded');
        }, 1000);
    });

    // Fallback: Hide preloader after 3 seconds
    setTimeout(function() {
        $('#preloader').addClass('loaded');
    }, 3000);

    // ==========================================
    // INITIALIZE AOS (Animate On Scroll)
    // ==========================================
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: 'mobile'
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    function handleNavbarScroll() {
        if ($(window).scrollTop() > 50) {
            $('#mainNavbar').addClass('scrolled');
        } else {
            $('#mainNavbar').removeClass('scrolled');
        }
    }

    $(window).on('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on page load

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutExpo');

            // Close mobile menu if open
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    function animateCounters() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');

            if (!$this.hasClass('counted')) {
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        $this.addClass('counted');
                    }
                });
            }
        });
    }

    // Trigger counter on scroll
    function checkCounterVisibility() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        $('.hero-stats').each(function() {
            var elementTop = $(this).offset().top;

            if (scrollTop + windowHeight > elementTop + 100) {
                animateCounters();
            }
        });
    }

    $(window).on('scroll', checkCounterVisibility);
    checkCounterVisibility(); // Check on page load

    // ==========================================
    // EVENTS CAROUSEL (Owl Carousel)
    // ==========================================
    $('.events-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // ==========================================
    // TESTIMONIALS CAROUSEL
    // ==========================================
    $('.testimonials-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        center: false,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });

    // ==========================================
    // CLIENTS CAROUSEL
    // ==========================================
    $('.clients-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    function handleBackToTop() {
        if ($(window).scrollTop() > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
    }

    $(window).on('scroll', handleBackToTop);

    $('#backToTop').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeInOutExpo');
    });

    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        var $form = $(this);
        var $btn = $form.find('button[type="submit"]');
        var originalText = $btn.html();

        // Simple validation
        var isValid = true;
        $form.find('[required]').each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        if (!isValid) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        // Show loading state
        $btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...').prop('disabled', true);

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(function() {
            $btn.html('<i class="fas fa-check"></i> Message Sent!').addClass('btn-success');

            showToast('Thank you! Your message has been sent successfully.', 'success');

            // Reset form
            setTimeout(function() {
                $form[0].reset();
                $btn.html(originalText).removeClass('btn-success').prop('disabled', false);
            }, 3000);
        }, 2000);
    });

    // ==========================================
    // PORTFOLIO FILTER (For Portfolio Page)
    // ==========================================
    $('.filter-btn').on('click', function() {
        var filterValue = $(this).attr('data-filter');

        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        // Filter items
        if (filterValue === 'all') {
            $('.portfolio-item').fadeIn(400);
        } else {
            $('.portfolio-item').fadeOut(200);
            $('.portfolio-item[data-category="' + filterValue + '"]').fadeIn(400);
        }
    });

    // ==========================================
    // PARALLAX EFFECT
    // ==========================================
    $(window).on('scroll', function() {
        var scrolled = $(window).scrollTop();

        // Parallax for hero section
        $('.hero-bg-image').css('transform', 'translateY(' + (scrolled * 0.4) + 'px)');

        // Parallax for floating shapes
        $('.shape-1').css('transform', 'translateY(' + (scrolled * 0.2) + 'px)');
        $('.shape-2').css('transform', 'translateY(' + (scrolled * -0.15) + 'px)');
    });

    // ==========================================
    // 3D FLIP EFFECT FOR SERVICE CARDS (CSS handles the flip)
    // ==========================================
    // Flip effect is handled by CSS :hover - no JS needed

    // ==========================================
    // HIGHLIGHT CARDS HOVER EFFECT
    // ==========================================
    $('.highlight-card').on('mouseenter', function() {
        $(this).find('.highlight-overlay').css('opacity', '1');
    }).on('mouseleave', function() {
        $(this).find('.highlight-overlay').css('opacity', '0');
    });

    // ==========================================
    // TOAST NOTIFICATION
    // ==========================================
    function showToast(message, type) {
        var bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17446E';

        var $toast = $('<div class="custom-toast"></div>')
            .text(message)
            .css({
                'position': 'fixed',
                'bottom': '30px',
                'left': '50%',
                'transform': 'translateX(-50%) translateY(100px)',
                'background': bgColor,
                'color': '#fff',
                'padding': '15px 30px',
                'border-radius': '50px',
                'box-shadow': '0 10px 30px rgba(0,0,0,0.2)',
                'z-index': '9999',
                'opacity': '0',
                'transition': 'all 0.3s ease'
            });

        $('body').append($toast);

        setTimeout(function() {
            $toast.css({
                'opacity': '1',
                'transform': 'translateX(-50%) translateY(0)'
            });
        }, 100);

        setTimeout(function() {
            $toast.css({
                'opacity': '0',
                'transform': 'translateX(-50%) translateY(100px)'
            });
            setTimeout(function() {
                $toast.remove();
            }, 300);
        }, 4000);
    }

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    function updateActiveNavLink() {
        var scrollPos = $(window).scrollTop() + 100;

        $('section[id]').each(function() {
            var section = $(this);
            var sectionTop = section.offset().top;
            var sectionBottom = sectionTop + section.outerHeight();
            var sectionId = section.attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    }

    $(window).on('scroll', updateActiveNavLink);

    // ==========================================
    // IMAGE LAZY LOADING
    // ==========================================
    if ('IntersectionObserver' in window) {
        var lazyImages = document.querySelectorAll('img[data-src]');

        var imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    }

    // ==========================================
    // MOUSE CURSOR EFFECT (Optional)
    // ==========================================
    if ($(window).width() > 991) {
        var cursor = $('<div class="custom-cursor"></div>');
        var cursorFollower = $('<div class="cursor-follower"></div>');

        // Uncomment below to enable custom cursor
        // $('body').append(cursor).append(cursorFollower);

        // $(document).on('mousemove', function(e) {
        //     cursor.css({
        //         'left': e.clientX,
        //         'top': e.clientY
        //     });

        //     setTimeout(function() {
        //         cursorFollower.css({
        //             'left': e.clientX,
        //             'top': e.clientY
        //         });
        //     }, 100);
        // });

        // $('a, button, .btn').on('mouseenter', function() {
        //     cursor.addClass('cursor-hover');
        //     cursorFollower.addClass('cursor-hover');
        // }).on('mouseleave', function() {
        //     cursor.removeClass('cursor-hover');
        //     cursorFollower.removeClass('cursor-hover');
        // });
    }

    // ==========================================
    // SCROLL REVEAL ANIMATION
    // ==========================================
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal');

        reveals.forEach(function(element) {
            var windowHeight = window.innerHeight;
            var elementTop = element.getBoundingClientRect().top;
            var elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    $(window).on('scroll', revealOnScroll);

    // ==========================================
    // MOBILE MENU HANDLING
    // ==========================================
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-collapse').collapse('hide');
            $('.navbar-toggler').removeClass('active');
        }
    });

    // ==========================================
    // FORM INPUT ANIMATION
    // ==========================================
    $('.form-control, .form-select').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });

    // ==========================================
    // TYPED TEXT EFFECT (Optional for Hero)
    // ==========================================
    // If you want typed effect, uncomment and include typed.js library
    // var typed = new Typed('.typed-text', {
    //     strings: ['Exhibition', 'Event', 'Branding'],
    //     typeSpeed: 100,
    //     backSpeed: 50,
    //     backDelay: 2000,
    //     loop: true
    // });

    // ==========================================
    // jQuery Easing
    // ==========================================
    $.easing.easeInOutExpo = function(x, t, b, c, d) {
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    // ==========================================
    // EVENT CARDS - ADD NO-IMAGE CLASS IF NO IMAGE
    // ==========================================
    $('.event-card').each(function() {
        if ($(this).find('.event-image').length === 0) {
            $(this).addClass('no-image');
        }
    });

    // ==========================================
    // CONSOLE WELCOME MESSAGE
    // ==========================================
    console.log('%c Kinetic Construction ', 'background: #17446E; color: #EA771C; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Crafting Exceptional Exhibition Experiences ', 'background: #EA771C; color: white; font-size: 12px; padding: 5px 10px;');
});

// ==========================================
// WINDOW RESIZE HANDLER
// ==========================================
$(window).on('resize', function() {
    // Reinitialize AOS on resize
    AOS.refresh();
});
