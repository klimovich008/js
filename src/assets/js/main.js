(function ($) {
    $(document).ready(function () {
        var resizeTimer;
        // Orientati Change
        $(window).on( 'orientationchange', function(e){
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                $(".js-navbar-toggle").removeClass("open");
                $(".js-mobile-menu").removeClass("collapse");
                $('body').removeClass("mobile-menu-open");
            }, 250);
        });

        // Toggle Mobile Menu
        $(".js-navbar-toggle").on("click", function () {
            $(this).toggleClass("collapsed open");
            $(".js-mobile-menu").toggleClass("collapse");
            $('body').toggleClass("mobile-menu-open");
        });

        // Prevent Page Jumps
        $(".js-dropdown__btn").on("click", function (e) {
            e.preventDefault();
        });

        // Make Navbar Sticky
        function initStickyMenu() {
            var panel = $('.js-sticky-menu');

            if (!panel.length)
                return;

            $(window).off('recalc.initStickyMenu').on('recalc.initStickyMenu', function () {
                panel.trigger("sticky_kit:detach").stick_in_parent({
                    parent: 'body'
                });
            }).trigger('recalc.initStickyMenu');
        }
        
        initStickyMenu();

        // Toggle Tiles
        $(".tile-block").on("click", function (e) {
            e.preventDefault();
            var $tiles = $(".tiles");
            var $tileBlock = $(this);
            var $tileContent = $($(this).data("target"));
            $tileBlock.toggleClass("collapsed");
            $tileContent.removeClass("in");
            

            if ($tileBlock.is(".tile-block-1, .tile-block-3, .tile-block-5")) {
                $tiles.addClass("row-inverse");
            } else {
                $tiles.removeClass("row-inverse");
            }
            
            // Close Other Block
            $(".tile-block").each(function () {
                if (!$tileBlock.is($(this)) && !$(this).hasClass("collapsed")) {
                    $(this).addClass("collapsed");
                }
            });

            $(".tile-block-content").each(function () {
                if (!$(this).is($tileContent)) {
                    $(this).removeClass('in');
                }
            });

            if (!$tileBlock.hasClass("collapsed")) {
                setTimeout(function() {
                    $tileContent.addClass("in");
                    $('html, body').stop().animate({
                        scrollTop: $tileBlock.offset().top - $(".navbar-sticky").height()
                    }, 200);
                }, 100)
            }
        });

        // Login
        $('.js-password-toggler').off('click.togglePasswordVisibility').on('click.togglePasswordVisibility', function(event) {
            event.preventDefault();
            var input = $(this).parent().find(".js-password-field");
            if (input.attr('type') === "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
            $(this).children('.icon').toggleClass("fa-eye fa-eye-slash");
        });

        $('#forgot-password-button').on('click', function() {
            const $forgotAfterModal = $('#forgot-modal-after');
            const $resetPasswordModal = $('#reset-modal');

            $resetPasswordModal.modal({ show: false });
            $forgotAfterModal.on('hidden.bs.modal', function () {
                $resetPasswordModal.modal('show');
            });
            $forgotAfterModal.modal('hide');
        });

        //help-box message
        let helpButton = document.getElementById('help-button');
        if (helpButton) {
            helpButton.addEventListener('click', function() {
                let helpMessage = document.getElementById('help-box');
                if (helpMessage.style.display == 'block') {
                    helpMessage.style.display = 'none';
                } else {
                    helpMessage.style.display = 'block'
                }
            }); 
        }


        //Invoices => search by
        let searchByForm = document.getElementById('search-byForm'),
            searchByElement = document.querySelectorAll('.search-by__content');
            searchByActive = 'invoices__search-by_active';
        if (searchByForm) {
            searchByForm.addEventListener('click', function() {
                searchByElement.forEach(element => {
                    element.classList.remove(searchByActive);
                    if ((event.target.id == element.dataset.key )) {
                        element.classList.add(searchByActive);          
                    }
                });
            });  
        }
    });

    let customerImg = document.getElementById('customer-img'),
        invoiceNumImg = document.getElementById('invoice-number-img'),
        invoiceTotalImg = document.getElementById('invoice-total-img');
    if (customerImg && invoiceTotalImg && invoiceNumImg) {
        if (window.screen.width < 668) {
            customerImg.src = '../images/Invoice_example_customer_number_mobile.png';
            invoiceNumImg.src = '../images/Invoice_example_mobile.png';
            invoiceTotalImg.src = '../images/Invoice_Total_amount_mobile.png';
        }
    }
    
})(jQuery);