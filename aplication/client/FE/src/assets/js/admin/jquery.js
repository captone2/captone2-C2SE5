jQuery(document).ready(function () {

    var items = jQuery(".tb-create tbody tr");
    var numItems = items.length;
    var perPage = 5;

    items.slice(perPage).hide();

    jQuery('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
});