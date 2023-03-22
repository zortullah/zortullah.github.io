/* General settings */
const app = $('#app')
const body = $('body')

/* Copy server ip */
function copyIp() {
    let copyText = document.getElementById("server-ip");
    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);
    swal.fire({
        title: $languages["success"],
        text: $languages["editJSServerIPCopy"],
        type: "success",
        confirmButtonColor: "#02b875",
        confirmButtonText: $languages["okey"]
    });
}

/* Profile menu */
let profileMenu = $('#profileMenu')
function openProfileMenu() {
    profileMenu.removeClass('hidden')
    setTimeout(e => {
        $('#profileMenu #profileMenuNav').addClass('!translate-x-0')
    },1)
    body.addClass('overflow-hidden')
}
function closeProfileMenu() {
    $('#profileMenu #profileMenuNav').removeClass('!translate-x-0')
    setTimeout(e => {
        profileMenu.addClass('hidden')
        body.removeClass('overflow-hidden')
    },200)
}

/* Mobile menu */
let mobileMenu = $('#mobileMenu')
function openMobileMenu() {
    mobileMenu.removeClass('hidden')
    setTimeout(e => {
        $('#mobileMenu #mobileMenuNav').addClass('!translate-x-0')
    },1)
    body.addClass('overflow-hidden')
}
function closeMobileMenu() {
    $('#mobileMenu #mobileMenuNav').removeClass('!translate-x-0')
    setTimeout(e => {
        mobileMenu.addClass('hidden')
        body.removeClass('overflow-hidden')
    },200)
}

/* Change language modal */
let changeLang = $('#changeLang')
function openChangeLang() {
    changeLang.removeClass('hidden')
    setTimeout(e => {
        $('#changeLang #changeLangContent').addClass('!translate-y-0')
    },1)
    body.addClass('overflow-hidden')
}
function closeChangeLang() {
    $('#changeLang #changeLangContent').removeClass('!translate-y-0')
    setTimeout(e => {
        changeLang.addClass('hidden')
        body.removeClass('overflow-hidden')
    },200)
}
/* Just Play modal */
let justPlay = $('#justPlay')
function openJustPlay() {
    justPlay.removeClass('hidden')
    setTimeout(e => {
        $('#justPlay #justPlayContent').addClass('!translate-y-0')
    },1)
    body.addClass('overflow-hidden')
}
function closeJustPlay() {
    $('#justPlay #justPlayContent').removeClass('!translate-y-0')
    setTimeout(e => {
        justPlay.addClass('hidden')
        body.removeClass('overflow-hidden')
    },10)
}
/* Panel modal */
let panelModal = $('#panelModal')
function openPanelModal() {
    panelModal.removeClass('hidden')
    setTimeout(e => {
        $('#panelModal #panelModalContent').addClass('!translate-y-0')
    },1)
    body.addClass('overflow-hidden')
}
function closePanelModal() {
    $('#panelModal #panelModalContent').removeClass('!translate-y-0')
    setTimeout(e => {
        panelModal.addClass('hidden')
        body.removeClass('overflow-hidden')
    },200)
}

$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
$(window).on("load", function() {
  $('.page-loader').addClass("hidden");
});
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 400,
            "density": {
                "enable": true,
                "value_area": 3000
            }
        },
        "color": {
            "value": "#96afda"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 3
            },
            "image": {
                "src": "img/github.svg",
                "width": 200,
                "height": 200
            }
        },
        "opacity": {
            "value": 0.75,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 5,
                "size_min": 0,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 500,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 2
        },
        "move": {
            "enable": true,
            "speed": 7.8914764163227265,
            "direction": "top",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "bubble"
            },
            "onclick": {
                "enable": false,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 0.5
                }
            },
            "bubble": {
                "distance": 400,
                "size": 4,
                "duration": 0.3,
                "opacity": 1,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});
$(document).ready(function() {
    $(document).scroll(function() {
        var scroll = $(this).scrollTop();
        var topDist = $("#navbar").position();
        if (scroll > topDist.top) {
            $('#fixedNavbar').removeClass('hidden');
        } else {
            $('#fixedNavbar').addClass('hidden');
        }
    });

    /***/
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        // => otomatik oynatma süresi | default: 5000
        // autoplayTimeout: 5000,

        // => hover olunduğunda oynatma dursun mu? | default: false
        // autoplayHoverPause: false,
        items: 1
    })


    /**/
    $('.tabs .tabs-link, .tabs .tabs-links').click(function() {
        var tabName = $(this).attr("tab-name");
        $("#" + tabName).find(".tabs-link, .tabs-links").removeClass('active');
        $(this).addClass('active');
		
		let currentTab = $(this).attr('href');
        $('[tab-content-name="'+tabName+'"]').find(".tabs-pane").each(function() { $(this).css("display", "none"); });
		$('[tab-content-name="'+tabName+'"]').find(currentTab).css("display", "block");
    });

    /**/
    $('.custom-select').customSelect();
});