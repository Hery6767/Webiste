const menuBtn = document.querySelector(".n2_menu_btn");
const navigation = document.querySelector(".n2_navigation");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
});
const btns = document.querySelectorAll(".n2_nav_btn");
const slides = document.querySelectorAll(".n2_video");
const contents = document.querySelectorAll(".n2_content");

let sliderNav = function(next){
    btns.forEach((btn) => {
        btn.classList.remove("active");
    });
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });
    contents.forEach((content) => {
        content.classList.remove("active");
    });
    btns[next].classList.add("active");
    slides[next].classList.add("active");
    contents[next].classList.add("active");
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
    })
})