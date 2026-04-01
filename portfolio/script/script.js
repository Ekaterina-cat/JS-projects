const btnBurger = document.querySelector(".header-burger");
const navMenu = document.querySelector(".nav");
const burgerLineFirst = document.querySelector(".burger-line-first");
const burgerLineSecond = document.querySelector(".burger-line-second");
const navList = document.querySelectorAll(".nav-list_item");

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
