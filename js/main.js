$(function () {
    var sections = $('.section'),
        display = $('.maincontent'),
        isScrool = false;
    var md = new MobileDetect(window.navigator.userAgent);
    isMobile = md.mobile;

    var performTransition = function (sectionEq) {
        if (isScrool) return
        isScrool = true;
        var position = (sectionEq * -100) + '%';
        display.css({
            'transform': 'translateY(' + position + ')',
            'webkit-transform': 'translateY(' + position + ')'
        })

        sections.eq(sectionEq).addClass('active')
            .siblings().removeClass('active');
        $('.fixed-menu__item').eq(sectionEq).addClass('active')
            .siblings().removeClass('active');
        setTimeout(function () {
            isScrool = false;
        }, 1000);

    }
    var defineSections = function (sections) {
        var activeSection = sections.filter('.active');
        return {
            activeSection: activeSection,
            nextSection: activeSection.next(),
            prevSection: activeSection.prev()
        }
    }


    var scrollToSection = function (direction) {
        var section = defineSections(sections)

        if (direction == 'up' && section.nextSection.length) {

            performTransition(section.nextSection.index());

        }
        if (direction == 'down' && section.prevSection.length) {

            performTransition(section.prevSection.index());

        }
    }
    $('.wrapper').on({
        wheel: function (e) {
            var deltaY = e.originalEvent.deltaY;
            var direction = deltaY > 0 ? 'up' : 'down';
            scrollToSection(direction);
        },
        touchmove: function (e) {
            e.preventDefault();
        }

    })
    $(document).on('keydown', function (e) {
        var section = defineSections(sections)

        switch (e.keyCode) {
            case 40:
                if (section.nextSection.length) {
                    performTransition(section.nextSection.index());
                }
                break;
            case 38:
                if (section.prevSection.length) {
                    performTransition(section.prevSection.index());
                }
        }


    })
    $('[data-goto]').on('click', function (e) {
        e.preventDefault();
        var elem = $(e.target),
            sectionNum = parseInt(elem.attr('data-goto'));

        performTransition(sectionNum);
    })
    if (isMobile) {
        $(window).swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                scrollToSection(direction);
            }

        })
    }
    $('.team__acco__title').on('click', function (e) {
        e.preventDefault();
        var elem = $(e.target).closest('.team-acco__item');
        activeElem = elem.hasClass('active');
        if (!activeElem) {
            elem.siblings('.team-acco__item').removeClass('active').find('.team__acco__content').slideUp(500);;
            elem.siblings('.team-acco__item').find('.team__acco__title').css("color", "#ffffff");
            elem.addClass('active').find('.team__acco__content').slideDown(500);
            elem.find('.team__acco__title').css("color", "#f9b43b");
        } else {
            elem.siblings('.team-acco__item').removeClass('active');
            elem.removeClass('active').find('.team__acco__content').slideUp(500);
            elem.find('.team__acco__title').css("color", "#ffffff");
        }


    })
    $('.menu-acco__trigger').on('click', function (e) {
        e.preventDefault();
        var elem = $(e.target).closest('.menu-acco__item'),
            activeElem = elem.hasClass('active');
        if (!activeElem) {
            elem.siblings('.menu-acco__item').removeClass('active')
            elem.siblings('.menu-acco__item').find('.menu-acco__content').css({"float": "left"}).animate({width:"0"},500);
            elem.find('.menu-acco__text').css({"display": "none"});
            elem.addClass('active').find('.menu-acco__content').animate({width:"545"},500).css({"float": "none"});
            elem.find('.menu-acco__text').css({"display": "block"});
        }
        else{ 
            elem.siblings('.menu-acco__item').removeClass('active')
            elem.removeClass('active').find('.menu-acco__content').css({"float": "left"}).animate({width:"0"},500);
            elem.find('.menu-acco__text').css({"display": "none"});
        }


    })


})
