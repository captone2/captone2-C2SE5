jQuery(document).ready(function () {

    // Chat bot
    jQuery(".icon-chatbot").on('click', function () {
        if (jQuery(".chatbot-container").css('opacity') === '0') {
            jQuery('.chatbot-container').css('animation', 'show 0.5s ease-in-out forwards');
        } else {
            jQuery('.chatbot-container').css({ animation: 'hide 0.5s ease-in-out forwards' });
        }
    });
    // Close Chat bot
    jQuery(".close-chat").on('click', function () {
        jQuery('.chatbot-container').css({ animation: 'hide 0.5s ease-in-out forwards' });
    });


    // Play Video
    jQuery('.btn-play').on('click', function () {
        jQuery('.video-main').css('display', 'block');
        jQuery('.video-main')[0].play();
    });

    jQuery('.video-main').on('ended', () => {
        jQuery('.video-main').css('display', 'none');
    });

    // if (!jQuery('.modal').hasClass('is-visible')) {
    //     jQuery('.video-main')[0].pause();
    // };

    // Select Chair price
    var total_price = 0;
    jQuery('.seat').on('click', function () {
        var count = jQuery('.active-seat').size();
        total_price = (count + 1) * 70000;

        if (jQuery(this).hasClass('active-seat')) {
            jQuery(this).removeClass('active-seat');
            var seats = jQuery('.select-chair').text();
            seats = seats.replace(jQuery(this).text() + ', ', '');
            jQuery('.select-chair').text(seats);
        } else {
            jQuery(this).addClass('active-seat');
            jQuery('.select-chair').append(jQuery(this).text() + ', ');
            jQuery('.total-price').text(total_price.toLocaleString('vi-VN'));
        }
        var counts = jQuery('.active-seat').size();
        if (counts > 5) {
            jQuery(".modal-maxchair").css('animation', 'downtop 0.5s ease-in-out forwards')
            jQuery(".modal-maxchair").css('display', 'block')
            jQuery('.overlay').css('display', 'block');
            jQuery(this).removeClass('active-seat');
            var seats = jQuery('.select-chair').text();
            seats = seats.replace(jQuery(this).text() + ', ', '');
            jQuery('.select-chair').text(seats);
            console.log(1);
        }


    });

    jQuery('.seat').each(function () {
        if (jQuery(this).hasClass('active-sold')) {
            jQuery(this).css('pointer-events', 'none');
        }
    });

    let minutes = 3;
    let seconds = 0;
    setInterval(() => {
        if (seconds > 0) {
            seconds -= 1;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                clearInterval();
            }
        }
        // Update the HTML with the new values
        jQuery('.count-down').text(minutes + ":" + seconds);
    }, 1000);



    jQuery('.minus').on('click', function () {
        var $input = jQuery(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 0 ? 0 : count;
        $input.val(count);
        $input.change();
        return false;
    });

    jQuery('.plus').on('click', function () {
        var $input = jQuery(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    var count = 0;
    jQuery('.btn-next').on('click', function () {
        count++;
        console.log(count);
        if (count === 1) {
            jQuery('.steps').removeClass('active-step');
            jQuery('.water-corn').addClass('active-step');
            jQuery('.booking-chair').css('display', 'none');
            jQuery('.book-food').css('display', 'block');
        } else if (count === 2) {
            jQuery('.steps').removeClass('active-step');
            jQuery('.payment-st').addClass('active-step');
            jQuery('.step-payment').css('display', 'block');
            jQuery('.booking-chair').css('display', 'none');
            jQuery('.book-food').css('display', 'none');
            jQuery('.info').css('display', 'none');
            jQuery('.total').css('margin-top', '0px');
            jQuery('.btn-next').css('display', 'none');
            jQuery('.btn-pay').css('display', 'block');
            jQuery('.description').css('display', 'block');
        }
    });

    jQuery('.btn-pay').on('click', function () {
        jQuery('.steps').removeClass('active-step');
        jQuery('.st-info').addClass('active-step');
    });


    var total_price = Number(jQuery('.total-price').text().replace(/,/g, "")) * 1000;
    var totalsArray = [0];
    jQuery('.plus').on('click', function () {
        var closet = jQuery(this).closest('tr');
        var price = Number(closet.find('.price').text().replace(/,/g, ""));
        totalsArray.push(price);
        let sum = 0;
        for (const value of totalsArray) {
            sum += value;
        }
        var all_sum = sum + total_price;
        jQuery('.total-price').text(all_sum.toLocaleString('vi-VN'));

    });

    jQuery('.minus').on('click', function () {
        var closet = jQuery(this).closest('tr');
        var price = Number(closet.find('.price').text().replace(/,/g, ""));
        totalsArray.pop(price);
        let sum = 0;
        for (const value of totalsArray) {
            sum += value;
        }
        var all_sum = sum + total_price;

        console.log(all_sum);
        var total = all_sum;
        jQuery('.total-price').text(total.toLocaleString('vi-VN'));
    });

    jQuery('.payment-gateway').on('click', function () {
        jQuery('.payment-gateway').removeClass('active-pay');
        jQuery('.fa-circle-check').removeClass('active-icon-pay');
        jQuery(this).find('.fa-circle-check').addClass('active-icon-pay');
        jQuery(this).addClass('active-pay');
    });
    // modal payment

    jQuery(".cls").on('click', function () {
        jQuery(".modal-payment").css('animation', 'topdown 0.5s ease-in-out forwards')
        jQuery(".modal-maxchair").css('animation', 'topdown 0.5s ease-in-out forwards')
        jQuery(".modal-rebuy").css('animation', 'topdown 0.5s ease-in-out forwards')
        jQuery(".modal-trailer").css('animation', 'topdown 0.5s ease-in-out forwards')
        jQuery(".overlay").css('display', 'none');
    });

    jQuery(".btn-cls").on('click', function () {
        jQuery(".modal-maxchair").css('animation', 'topdown 0.5s ease-in-out forwards')
        jQuery(".overlay").css('display', 'none');
    });


    jQuery(".overlay").on('click', function () {
        jQuery(".modal-payment").css('animation', 'topdown 0.5s ease-in-out forwards')
        jQuery(".modal-trailer").css('animation', 'topdown 0.5s ease-in-out forwards')
        jQuery('.video-main')[0].pause();
        jQuery(this).css('display', 'none');
    });

    jQuery(".btn-pay").on('click', function () {
        jQuery(".modal-payment").css('animation', 'downtop 0.5s ease-in-out forwards')
        jQuery(".modal-payment").css('display', 'block')
        jQuery(".overlay").css('display', 'block');
    });

    jQuery(".slide-button").find('.btn-trailer').on('click', function () {
        jQuery(".modal-trailer").css('animation', 'downtop 0.5s ease-in-out forwards')
        jQuery(".modal-trailer").css('display', 'block')
        jQuery(".overlay").css('display', 'block');
    });



    // Toggle drop down user
    jQuery(".img-user").click(function () {
        jQuery(".list-down").slideToggle();
    });
});