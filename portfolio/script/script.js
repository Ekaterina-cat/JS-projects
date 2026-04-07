const btnBurger = document.querySelector(".header-burger");
const navMenu = document.querySelector(".nav");
const burgerLineFirst = document.querySelector(".burger-line-first");
const burgerLineSecond = document.querySelector(".burger-line-second");
const navList = document.querySelectorAll(".nav-list_item");

const slider = document.querySelector(".slider");

const blockFaqAnswers = document.querySelectorAll(".faq-accordion-item");
const accordion = document.querySelectorAll(".faq-accordion-item_a");
const plusFaq = document.querySelectorAll(".plus");
const minusFaq = document.querySelectorAll(".minus");

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

function clickItemAccordion() {}

function clickOtherItemAccordion(answer) {
  blockFaqAnswers.forEach((otherAnswer) => {
    if (otherAnswer !== answer) {
      const otherTextAccordion = otherAnswer.childNodes[3];
      const otherMinus = otherAnswer.childNodes[1].childNodes[3];
      const otherPlus = otherAnswer.childNodes[1].childNodes[5];

      otherTextAccordion.classList.remove("active-accordion");
      otherMinus.classList.remove("active-minus");
      otherPlus.classList.remove("active-plus");
    }
  });
}

blockFaqAnswers.forEach((answer) => {
  answer.childNodes[1].addEventListener("click", () => {
    const textAccordionCurrent = answer.childNodes[3];
    const minusCurrent = answer.childNodes[1].childNodes[3];
    const plusCurrent = answer.childNodes[1].childNodes[5];
    const isActive =
      textAccordionCurrent.classList.contains("active-accordion");

    if (isActive) {
      textAccordionCurrent.classList.remove("active-accordion");
      minusCurrent.classList.remove("active-minus");
      plusCurrent.classList.remove("active-plus");
      return;
    }

    clickOtherItemAccordion(answer);

    textAccordionCurrent.classList.add("active-accordion");
    minusCurrent.classList.add("active-minus");
    plusCurrent.classList.add("active-plus");
  });
});
