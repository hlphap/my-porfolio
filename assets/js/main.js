/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
        });
    }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.add("active");
        } else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active");
        }
    });
}
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
    delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

// Slider
window.addEventListener("load", function () {
    const sliderMain = document.querySelector(".slider__main");
    const sliderItems = document.querySelectorAll(".slider__item");
    const sliderDotItems = document.querySelectorAll(".slider__dot-item");
    const nextBtn = document.querySelector(".slider__next");
    const prevBtn = document.querySelector(".slider__prev");
    let positionX = 0;
    let index = 0;

    const sliderItemWidth = sliderItems[0].offsetWidth;
    const lengthItem = sliderItems.length;

    let myTimerNextSlider = window.setInterval(autoNewSlider, 4000);

    nextBtn.addEventListener("click", function () {
        index++;
        handleChangeSlider();
        window.clearInterval(myTimerNextSlider);
        myTimerNextSlider = window.setInterval(autoNewSlider, 4000);
    });

    prevBtn.addEventListener("click", function () {
        index--;
        handleChangeSlider();
        window.clearInterval(myTimerNextSlider);
        myTimerNextSlider = window.setInterval(autoNewSlider, 4000);
    });

    sliderDotItems.forEach((dotItem, i) => {
        dotItem.addEventListener("click", function () {
            index = i;
            handleChangeSlider();
            window.clearInterval(myTimerNextSlider);
            myTimerNextSlider = window.setInterval(autoNewSlider, 4000);
        });
    });

    function removeDots() {
        sliderDotItems.forEach((dotItem) => {
            dotItem.classList.remove("learning__control-item--selected");
        });
    }

    function handleChangeSlider() {
        if (index >= lengthItem - 1) index = lengthItem - 1;
        if (index <= 0) index = 0;
        positionX = -index * sliderItemWidth;
        sliderMain.style = `transform: translateX(${positionX}px)`;
        removeDots();
        sliderDotItems[index].classList.add("learning__control-item--selected");
    }

    function autoNewSlider() {
        index++;
        if (index > lengthItem - 1) {
            index = 0;
        }
        handleChangeSlider();
    }
});
