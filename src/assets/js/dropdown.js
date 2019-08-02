var View = new (function () {
    var body = $(document.body);
    var htmlbody = $([document.documentElement, document.body]);
    var win = $(window);
    var doc = $(document);

    // breakpoints
    this.breakpoints = {
        'lg-min': 1210,
        'md-max': 1209,
        'md-min': 992,
        'sm-max': 991,
        'sm-min': 768,
        'xs-max': 767
    };

	this.mobileAndTabletCheck = (function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    })();
	
    this.control = {
        openDropdown: function (dropdown, dropdownBtn, dropdownBody) {
            this.closeAllDropdown();

            dropdown.addClass('open');
            dropdownBtn.addClass('open');
            dropdownBody.addClass('open');
        },

        closeDropdown: function (dropdown, dropdownBtn, dropdownBody) {
            dropdown.removeClass('open');
            dropdownBtn.removeClass('open');
            dropdownBody.removeClass('open');
        },

        closeAllDropdown: function () {
            var otherDropdowns = $('.js-dropdown');
            var otherDropdownBtns = $('.js-dropdown__btn');
            var otherDropdownBodys = $('.js-dropdown__body');

            this.closeDropdown(otherDropdowns, otherDropdownBtns, otherDropdownBodys);
            $('.dropdown').removeClass('open')

        },

        closeAll: function () {
            this.closeAllDropdown();
        }


    };


    this.init = {
        global: {

        },


        local: {
            dropdowns: function (scope) {
                var showTimeout, hideTimeout;

                if (View.mobileAndTabletCheck && window.innerWidth < 992) {
                    $('.js-dropdown__btn', scope).off('click.openDropdown').on('click.openDropdown', function (e) {
                        var btn = $(this);
                        var dropdown = btn.closest('.js-dropdown');
                        var dropdownBody = dropdown.find('.js-dropdown__body');

                        if (btn.hasClass('open')) {
                            View.control.closeDropdown(dropdown, dropdownBody, btn);
                        } else {
                            View.control.openDropdown(dropdown, dropdownBody, btn);
                            e.preventDefault();
                        }
                    });
                } else {
                    $('.js-dropdown__btn', scope).off('mouseenter.openDropdown').on('mouseenter.openDropdown', function () {
                        var btn = $(this);
                        var dropdown = btn.closest('.js-dropdown');
                        var dropdownBody = dropdown.find('.js-dropdown__body');

                        clearTimeout(showTimeout);

                        if (!dropdown.hasClass('open')) {
                            showTimeout = setTimeout(function () {
                                clearTimeout(hideTimeout);
                                View.control.openDropdown(dropdown, btn, dropdownBody);
                            }, 100);
                        }
                    });


                    $('.js-dropdown__btn, .js-dropdown__body', scope).off('mouseover.openDropdown').on('mouseover.openDropdown', function () {
                        if ($(this).hasClass('open')) {
                            clearTimeout(hideTimeout);
                        }
                    });

                    $('.js-dropdown__btn, .js-dropdown__body', scope).off('mouseleave.closeDropdown').on('mouseleave.closeDropdown', function () {
                        clearTimeout(showTimeout);
                        var dropdown = $(this).closest('.js-dropdown');
                        var dropdownBtn = dropdown.find('.js-dropdown__btn');
                        var dropdownBody = dropdown.find('.js-dropdown__body');

                        if ($('.js-dropdown.open .js-dropdown__body input:focus, .js-dropdown.open .js-dropdown__body textarea:focus').length > 0)
                            return;

                        hideTimeout = setTimeout(function () {
                            View.control.closeDropdown(dropdown, dropdownBtn, dropdownBody);
                        }, 400);
                    });
                }

                body.off('click.closeDropdown', '.js-dropdown__close').on('click.closeDropdown', '.js-dropdown__close', function () {
                    View.control.closeAllDropdown();
                });

                body.off('click.closeAllDropdownOnClickBody').on('click.closeAllDropdownOnClickBody', function (e) {
                    var t = e.target;

                    if (!t.closest('.js-dropdown'))
                        View.control.closeAllDropdown();
                });
            },
        },
    };


    this.initView = function () {
        body = $(document.body);
        htmlbody = $([document.documentElement, document.body]);
        win = $(window);

        this.scrollBarWidth = (function () {
            var outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar";

            document.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;
            // force scrollbars
            outer.style.overflow = "scroll";

            // add innerdiv
            var inner = document.createElement("div");
            inner.style.width = "100%";
            outer.appendChild(inner);

            var widthWithScroll = inner.offsetWidth;

            // remove divs
            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        })();
    };


    this.initAllGlobal = function () {
        $.each(this.init.global, function (index, fn) {
            if (typeof fn === 'function') fn();
        });
    };

    this.initAllLocal = function (scope) {
        $.each(this.init.local, function (index, fn) {
            if (typeof fn === 'function') fn(scope);
        });
    };
})();

function initAllLocal(event, scope) {
    View.initAllLocal(scope);
}

$(document).ready(function () {
    var body = $("body");
    var iOS = parseInt(
        ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1])
            .replace('undefined', '3_2').replace('_', '.').replace('_', '')
    ) || false;

    body.addClass(iOS ? ('ios ios-' + iOS) : 'no-ios');
    body.addClass(View.mobileAndTabletCheck ? 'touch' : 'no-touch');

    View.initView();
    View.initAllGlobal();

    body.on("onAjaxReload.initAllLocal", initAllLocal).triggerHandler("onAjaxReload.initAllLocal", [$("body")]);
});



//account dropdown
let userAccount = document.getElementById('user-dropdown');
if (userAccount) {
    userAccount.addEventListener('click', function () {
        let dropdownMenu = document.getElementById('user-dropdown_menu');
        let accountOverlay = document.getElementById('account__overlay');
        if (dropdownMenu.classList.contains('js-dropdown-menu_visible')) {
            if ($(window).width() < 768) {
                accountOverlay.style.display = 'none';
            }
            dropdownMenu.classList.remove('js-dropdown-menu_visible');
        } else {
            // Account page overlay when dropdown is active
            if ($(window).width() < 768) {
                accountOverlay.style.display = 'block';
            }
            dropdownMenu.classList.add('js-dropdown-menu_visible');
        }
    }); 
}


// account adress dropdown
let userAdress = document.getElementById('user-adress');
    if (userAdress) {
    userAdress.addEventListener('click', function () {
        let dropdownMenu = document.getElementById('user-adress-dropdown');
        let adressOverlay = document.getElementById('adress__overlay');
        if (dropdownMenu.classList.contains('js-dropdown-menu_visible')) {
            dropdownMenu.classList.remove('js-dropdown-menu_visible');
            userAdress.classList.remove('js-dropdown-menu_visible');
        } else {
            dropdownMenu.classList.add('js-dropdown-menu_visible');
            userAdress.classList.add('js-dropdown-menu_visible');
            
            const bodyHeight = document.body.getBoundingClientRect().height;
            const bodyWidth = document.body.getBoundingClientRect().width;
            const overlayTop = adressOverlay.getBoundingClientRect().top;
            adressOverlay.style.height = bodyHeight - overlayTop + 'px';
            adressOverlay.style.width = bodyWidth + 'px';
        }
    });
}