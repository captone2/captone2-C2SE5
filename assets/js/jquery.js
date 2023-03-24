jQuery(document).ready(function () {


    jQuery(".icon-chatbot").on('click', function () {
        if (jQuery(".chatbot-container").css('opacity') === '0') {
            jQuery('.chatbot-container').css('animation', 'show 0.5s ease-in-out forwards');
        } else {
            jQuery('.chatbot-container').css({ animation: 'hide 0.5s ease-in-out forwards' });
        }
    });

    jQuery(".close-chat").on('click', function () {
        jQuery('.chatbot-container').css({ animation: 'hide 0.5s ease-in-out forwards' });
    });


    jQuery('.btn-play').on('click', function () {
        jQuery('.video-main').css('display', 'block');
        jQuery('.video-main')[0].play();
    });


    jQuery('.video-main').on('ended', () => {
        jQuery('.video-main').css('display', 'none');
    });

    if (!jQuery('.modal').hasClass('is-visible')) {
        jQuery('.video-main')[0].pause();
    };


})
