const btnBurger = document.querySelector(".header-burger");
const navMenu = document.querySelector(".nav");
const burgerLineFirst = document.querySelector(".burger-line-first");
const burgerLineSecond = document.querySelector(".burger-line-second");
const navList = document.querySelectorAll(".nav-list_item");

const slider = document.querySelector(".slider");

function workBurgerMenu() {
  navMenu.classList.toggle("active-nav-menu");
  burgerLineFirst.classList.toggle("active-burger-line");
  burgerLineSecond.classList.toggle("active-burger-line");
  btnBurger.classList.toggle("active-btn-burger");
}

btnBurger.addEventListener("click", () => {
  workBurgerMenu();
});

navList.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    workBurgerMenu();
  });
});

let scrollDirection = 0;
let scrollSpeed = 5;

function autoScroll() {
  if (scrollDirection !== 0) {
    slider.scrollLeft += scrollDirection * scrollSpeed;
  }
  requestAnimationFrame(autoScroll);
}

slider.addEventListener("mousemove", (e) => {
  const sliderWidth = slider.clientWidth;
  const mouseX = e.clientX - slider.getBoundingClientRect().left;
  if (mouseX < sliderWidth * 0.3) {
    scrollDirection = 1;
    autoScroll();
  } else if (mouseX > sliderWidth * 0.7) {
    scrollDirection = -1;
    autoScroll();
  } else {
    scrollDirection = 0;
  }
});

slider.addEventListener("mouseleave", () => {
  scrollDirection = 0;
});
