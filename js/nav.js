document.addEventListener("DOMContentLoaded", function () {
    initSideNav();
    initParallax();
    initScrollSpy();
    setTimeout(() => {
        initMaterialBoxed();
    }, 100);
    loadNav();
})


function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status != 200) return;
            // Muat Daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                elm.innerHTML = xhttp.responseText;
            })
            document.querySelectorAll(".topnav li a, .sidenav li a").forEach(function (elm) {
                const page = elm.getAttribute("href").substr(1);
                loadPage(page);
            })

        }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();

}
function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            var content = document.querySelector(`#${page}`);
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak dapat ditemukan</p>"
            } else {
                content.innerHTML = "<p>Halaman tidak dapat diakses</p>"
            }
        }
    }
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
}
function initScrollSpy() {
    const scrollSpyOpt = {
        scrollOffset: 60
    };
    var scrollspy = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(scrollspy, scrollSpyOpt);
}

function initParallax() {
    var parallax = document.querySelectorAll(".parallax");
    M.Parallax.init(parallax);
}

function initSideNav() {
    var sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav);
}
function initMaterialBoxed() {
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
}