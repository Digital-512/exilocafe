"use strict";

// Close the dropdown if the user clicks outside of it
$(window).click(function (event) {
    let dropdowns = $('.dropdown-content');
    dropdowns.each(function (i, el) {
        if ($(el).css('display') !== 'none' && !$(el).closest('.has-dropdown').find($(event.target)).length) {
            $(el).hide();
        }
    });
});

// Find all buttons that have dropdown
let dropdown_buttons = $('.has-dropdown');
dropdown_buttons.click(function (event) {
    // Show or hide dropdown menu
    let content = $(this).find('.dropdown-content');
    if (content.css('display') === 'none') {
        content.show();
    } else if ($(event.target).closest('.dropdown-content').length) {
        // Prevent closing if no-close is set
        if ($(event.target).closest('.dropdown-no-close').length) {
            return;
        }
        // Wait some time before closing menu, so the user can see the effect
        setTimeout(function () {
            content.hide();
        }, 50);
    } else {
        // If button is clicked again, close immediately
        content.hide();
    }
});
