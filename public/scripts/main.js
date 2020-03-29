"use strict";

window.addEventListener('click', function (event) {
    // Close the dropdown if the user clicks outside of it.
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
        var el = dropdowns[i];
        if (el.style.display !== 'none' && !el.closest('.has-dropdown').contains(event.target)) {
            el.style.display = 'none';
        }
    }

    // Find all buttons that have dropdown.
    var dropdownButton = event.target.closest('.has-dropdown');
    if (dropdownButton) {
        var content = dropdownButton.querySelector('.dropdown-content');
        if (!content.style.display || content.style.display === 'none') {
            content.style.display = 'block';
        } else if (event.target.closest('.dropdown-content')) {
            // Prevent closing if no-close is set.
            if (event.target.closest('.dropdown-no-close')) {
                return;
            }
            // Wait some time before closing menu, so the user can see the effect.
            setTimeout(function () {
                content.style.display = 'none';
            }, 50);
        } else {
            // If button is clicked again, close immediately.
            content.style.display = 'none';
        }
    }
});
