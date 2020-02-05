"use strict";

var mdl_nav_links = $('.mdl-navigation__link');
mdl_nav_links.each(function (i, el) {
    var data_location = $(el).data('location');
    if (data_location) {
        $(el).click(function () {
            location.href = '/' + data_location;
        });
    }
});
