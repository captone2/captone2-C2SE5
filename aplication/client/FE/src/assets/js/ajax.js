jQuery(document).ready(function ($) {
    console.log(1);
    $('.btn-next').on('click', function () {
        var url = window.location.href;
        $.ajax({
            url: url,
            success: function (data) {
                console.log(data);
                $('.target').html(data);
            }
        });
    });
});